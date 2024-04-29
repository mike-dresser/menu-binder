from flask import Flask, jsonify, request
import os
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

migrate = Migrate(app, db)

db.init_app(app)

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
                     "menus": []
                     }

    for entry in i["category_item"]:
        menu = entry["category"]["menu"]["name"]
        response_item["menus"].append(menu)

    for allergen in i["item_allergens"]:
        allergen_response = {
            "name": allergen["allergen"]["name"],
            "notes": allergen["notes"]
        }
        response_item["allergens"].append(allergen_response)

    return response_item

@app.route('/')
def home():
    return 'Welcome to the Menu API', 200

@app.route('/items', methods = ['GET'])
def all_items():
    response = [allergy_serialize(item) for item in Item.query.all()]
    return add_cors(response), 200

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