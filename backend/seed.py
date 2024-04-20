from models import db, Item, ItemAllergen, Allergen
from app import app


with app.app_context():

    print('Deleting all records...')
    Allergen.query.delete()
    Item.query.delete()
    ItemAllergen.query.delete()

    print('Populating allergens...')
    
    allium = Allergen(name='Allium')
    gluten = Allergen(name='Gluten')
    dairy = Allergen(name='Dairy')
    nuts = Allergen(name='Nuts')
    sesame = Allergen(name='Sesame')
    fish = Allergen(name='Fish')
    shellfish = Allergen(name='Shellfish')
    legumes = Allergen(name='Legumes')

    db.session.add_all([allium, gluten, dairy, nuts, sesame, fish, shellfish, legumes])
    db.session.commit()

    print('Adding items...')
    olives = Item(name='Marinated Olives',
                description='mixed Greek olives, lemon, garlic, olive oil',
                mise='Small ramekin for pits')

    db.session.add(olives)
    db.session.commit()

    print('Adding items allergens...')
    olives_allergens = ItemAllergen(item_id=olives.id, allergen_id=allium.id)

    db.session.add(olives_allergens)
    db.session.commit()