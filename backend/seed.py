from models import db, Item, ItemAllergen, Allergen
from app import app


with app.app_context():

    print('Deleting all records...')
    Allergen.query.delete()
    Item.query.delete()
    ItemAllergen.query.delete()

    print('Populating allergens...')
    
    allium = Allergen(name='Allium')
    nightshade = Allergen(name='Nightshade')
    gluten = Allergen(name='Gluten')
    dairy = Allergen(name='Dairy')
    nuts = Allergen(name='Nuts')
    sesame = Allergen(name='Sesame')
    fish = Allergen(name='Fish')
    shellfish = Allergen(name='Shellfish')
    legumes = Allergen(name='Legumes')

    db.session.add_all([allium, nightshade, gluten, dairy, nuts, sesame, fish, shellfish, legumes])
    db.session.commit()

    print('Adding items...')
    olives = Item(name='Marinated Olives',
                description='mixed Greek olives, lemon, garlic, olive oil',
                mise='Small ramekin for pits')
    db.session.add(olives)
    db.session.commit()

    olives_allergens = ItemAllergen(item_id=olives.id, allergen_id=allium.id)
    db.session.add(olives_allergens)
    db.session.commit() 

    pickles = Item(name='House Pickles',
                description='Vegetables (cauliflower, carrots, cucumber, jalapenos, radish,celery ) pickled with chili-infused white vinegar',
                mise='Fork')
    pickles_allergens = ItemAllergen(item_id=pickles.id, allergen_id=allium.id)
    db.session.add(olives_allergens)
    db.session.commit()                
    whitefish = Item(name='Whitefish',
                description='Whipped whitefish salad (whitefish, mayonnaise), served in a jar. Served with bagel chips',
                mise='Fork, Knife, Tea Spoon (Share)')
    chips = Item(name='Chips & Dip',
                description='House fried (in canola) sweet potato and idaho potato chips.Served with black pepper ranch (sour cream, mayonnaise, lemon juice, garlic, buttermilk, black pepper, onion powder, garlic powder) topped with 1⁄2 ounce Grinnel caviar (from bowfin fish,harvested in Alabama) and chives',
                mise='Mark with demi spoon')   


    db.session.add(olives_allergens)
    db.session.commit()