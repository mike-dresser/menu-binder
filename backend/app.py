from flask import Flask
import os
from flask_migrate import Migrate;
from models import db, Item, ItemAllergen, Allergen, CategoryItem, Category, Menu

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get("DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)


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
    return [allergy_serialize(item) for item in Item.query.all()], 200

@app.route('/items/<int:id>')
def get_item(id):
    item = Item.query.filter_by(id = id).first()
    if not item:
        return {"error": f"No item with id {id} found."}, 404
    response = allergy_serialize(item)
    return response, 200

if __name__ == "__main__":
    app.run(port=5555, debug=True)