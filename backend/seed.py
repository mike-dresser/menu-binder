import json
from app import app
from models import db, Item, ItemAllergen, Allergen, Category, CategoryItem, Menu

file = open('./test_menu.json')
menu_data = json.load(file)

with app.app_context():

    print('Deleting all records...')
    Allergen.query.delete()
    Item.query.delete()
    ItemAllergen.query.delete()
    Category.query.delete()
    CategoryItem.query.delete()
    Menu.query.delete()

    for menu in menu_data:
        # add menu if does not exist, set menu_id
        existing_menu = Menu.query.filter_by(name = menu['name']).first()
        if not existing_menu:
            new_menu = Menu(name = menu['name'])
            db.session.add(new_menu)
            db.session.commit()
            menu_id = new_menu.to_dict()['id']
        else:
            menu_id = existing_menu['id']

        # iterate through items
        for item in menu['items']:
            existing_item = Item.query.filter_by(name = item['name']).first()
            if not existing_item:
                new_item = Item(name = item['name'], description = item['description'], mise = item['mise'])
                db.session.add(new_item)
                db.session.commit()
            else:
                new_item = existing_item

            # add allergens listed by name...
            for allergen in item['allergies']:
                existing_allergen = Allergen.query.filter_by(name = allergen['name']).first()

                # add new allergen to allergens table if doesn't exist 
                if not existing_allergen:
                    new_allergen = Allergen(name=allergen['name'])
                    db.session.add(new_allergen)
                    db.session.commit()
                
                # create ItemAllergen record
                current_allergen_id = Allergen.query.filter_by(name = allergen['name']).first().to_dict()['id']
                new_item_allergen = ItemAllergen(item_id = new_item.to_dict()['id'], 
                                                allergen_id = current_allergen_id,
                                                notes = allergen.get('notes'))
                db.session.add(new_item_allergen)
                db.session.commit()

            # adding item to category...
            category = item.get('category')
            existing_category = Category.query.filter(Category.name == category, Category.menu_id == menu_id).first()

            # add category if does not exist
            if not existing_category:
                new_category = Category(name = category, menu_id = menu_id)
                db.session.add(new_category)
                db.session.commit()
                category_id = new_category.to_dict()['id']
            else:
                category_id = existing_category.to_dict()['id'] 

            new_category_item = CategoryItem(item_id = new_item.to_dict()['id'], category_id = category_id)
            db.session.add(new_category_item)
            db.session.commit()