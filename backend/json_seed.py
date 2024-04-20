import json
from app import app
from models import db, Item, ItemAllergen, Allergen

file = open('./test_menu.json')
menu_data = json.load(file)

with app.app_context():
    print('Deleting all records...')
    Allergen.query.delete()
    Item.query.delete()
    ItemAllergen.query.delete()

    for item in menu_data['menu']:
        new_item = Item(name = item['name'], description = item['description'], mise = item['mise'])
        db.session.add(new_item)
        db.session.commit()

        for allergen in item['allergies']:
            existing_allergen = Allergen.query.filter_by(name = allergen['name']).first()
            if not existing_allergen:
                new_allergen = Allergen(name=allergen['name'])
                db.session.add(new_allergen)
                db.session.commit()
            current_allergen_id = Allergen.query.filter_by(name = allergen['name']).first().to_dict()['id']
            new_item_allergen = ItemAllergen(item_id = new_item.to_dict()['id'], 
                                             allergen_id = current_allergen_id,
                                             available_mod = allergen.get('mod'))
            db.session.add(new_item_allergen)
            db.session.commit()
