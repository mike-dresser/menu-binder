from flask import Flask, jsonify, request
import os, random
from flask_migrate import Migrate;
from flask_cors import CORS
from models import db, Item, ItemAllergen, Allergen, CategoryItem, Category, Menu

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get("DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")
app = Flask(__name__)
# this proved unecessary with the jsonify.headers add approach
# cors = CORS(app, resources={r"/": {"origins": "*"}})
# vv This was necessary to allow patch requests
cors = CORS(app);
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.json.compact = False
# imports to allow file uploads
UPLOAD_FOLDER = '../frontend/public'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'avif', 'heif', 'heic', 'tiff'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

migrate = Migrate(app, db)

db.init_app(app)

def allowed_file(filename):
    """ Checks uploaded image for valid filename """
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def add_cors(response):
    '''Add cross-origin headers to keep CORS happy
    
    Parameters:
        response: a non-JSONified Python object'''

    updated_response = jsonify(response)
    updated_response.headers.add('Access-Control-Allow-Origin', '*')
    return updated_response

def allergy_serialize(item):
    '''A workaround to get nicely serialized allergy lists'''

    i = item.to_dict()
    response_item = {"id": i["id"],
                     "name": i["name"],
                     "description": i["description"],
                     "mise": i["mise"],
                     "active": i["active"],
                     "image": i["image"],
                     "price": i["price"],
                     "allergens": [],
                     "categories": []
                     }

    for entry in i["category_item"]:
        category = {"menu": {"name": entry["category"]["menu"]["name"],
                             "id": entry["category"]["menu"]["id"]},
                    "category": {"name": entry["category"]["name"],
                                 "id": entry["category_id"]}}
        response_item["categories"].append(category)

    for allergen in i["item_allergens"]:
        if allergen:
            allergen_response = {
                "name": allergen["allergen"]["name"],
                "id": allergen["allergen"]["id"],
                "notes": allergen["notes"]
            }
            response_item["allergens"].append(allergen_response)

    return response_item

@app.route('/', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'GET':
        return 'Welcome to the Menu API', 200
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            return {'error': 'no file part'}, 400
        file = request.files['file']
        # If the user does not select a file, the browser submits an
        # empty file without a filename.
        if file.filename == '':
            return {'error': 'no selected file'}, 400
        if file and allowed_file(file.filename):
            file_extension = file.filename.rsplit('.', 1)[1].lower()
            rand_file_name = f'{random.randrange(100000)}.{file_extension}'
            file_location = os.path.join(app.config['UPLOAD_FOLDER'], rand_file_name) 
            file.save(file_location)
            return {"filename": rand_file_name}, 200

@app.route('/items', methods = ['GET', 'POST'])
def all_items():
    if request.method == 'GET':
        response = [allergy_serialize(item) for item in Item.query.all()]
        return add_cors(response), 200
    if request.method == 'POST':
        r = request.get_json()
        new_item = Item(name=r.get('name'),
                        price=r.get('price'),
                        description=r.get('description'),
                        mise=r.get('mise'),
                        image=r.get('image'),
                        active=r.get('active'))
        db.session.add(new_item)
        db.session.commit()
        for allergen in r.get('allergens'):
            new_item_allergen = ItemAllergen(item_id=new_item.to_dict()['id'],
                                             allergen_id=allergen.get('allergen_id'),
                                             notes=allergen.get('notes'))
            db.session.add(new_item_allergen)
        for category in r.get('categories'):
            new_category_item = CategoryItem(item_id=new_item.to_dict()['id'],
                                             category_id=category['category']['id'])
            db.session.add(new_category_item)
        db.session.commit()
        response = allergy_serialize(new_item);
        return add_cors(response), 201

@app.route('/items/<int:id>', methods = ['GET', 'PATCH'])
def one_item(id):
    item = Item.query.filter_by(id = id).first()
    if not item:
        return {"error": f"No item with id {id} found."}, 404
    if request.method == 'GET':
        response = allergy_serialize(item)
        return add_cors(response), 200
    if request.method == 'PATCH':
        req_data = request.get_json()
        for key, value in req_data.items():
            setattr(item, key, value)
        db.session.add(item)
        db.session.commit()
        response = allergy_serialize(item)
        return add_cors(response), 202


@app.route('/menus')
def items_by_menu():
    response = [menu.to_dict() for menu in Menu.query.all()]
    return add_cors(response), 200

@app.route('/allergens')
def all_allergens():
    response = [allergen.to_dict() for allergen in Allergen.query.all()]
    return add_cors(response), 200

@app.route('/categories')
def menu_categories():
    response = []
    all_categories = [category.to_dict() for category in Category.query.all()]
    for cat in all_categories:
       cat_response = {"name": cat.get('name'),
                       "category_id": cat.get('id'),
                       "menu_id": cat.get('menu_id'),
                       "menu": cat.get('menu').get('name')}
       response.append(cat_response)
    return add_cors(response), 200

@app.route('/filter')
def filtered_items():
    # Search query is formatted ' .../filter?menu=Lunch&allergens=gluten,shellfish '
    query = request.args
    response = {"categories": []}
    for category in Menu.query.filter(Menu.name == query.get('menu')).first().categories:
        category = category.to_dict()
        filtered = []
        for each in category.get('category_items'):
            allergen_present = False
            for allergen in each['item']['item_allergens']:
                for query_allergen in query.get('allergens').split(','):
                    if allergen['allergen']['name'] == query_allergen:
                        allergen_present = True
            if not allergen_present:
                    filtered.append(each)
        filtered_cat = {"name": category.get('name'),
                    "category_items": filtered}
        response['categories'].append(filtered_cat)
    return add_cors(response), 200

if __name__ == "__main__":
    app.run(port=5555, debug=True)