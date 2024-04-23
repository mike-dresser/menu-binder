from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin

metadata = MetaData(
    naming_convention={
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    }
)

db = SQLAlchemy(metadata=metadata)

class Item(db.Model, SerializerMixin):
    __tablename__ = 'items'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    price = db.Column(db.Float)
    description = db.Column(db.String)
    image = db.Column(db.String)
    mise = db.Column(db.String)
    active = db.Column(db.Boolean, default=True)

    item_allergens = db.relationship('ItemAllergen', back_populates = 'item')
    category_item = db.relationship('CategoryItem', back_populates = 'item')

    serialize_rules = ('-item_allergens.item', '-category_item.item')

    def __repr__(self):
        return f'<Item {self.id} {self.name}>'

class ItemAllergen(db.Model, SerializerMixin):
    __tablename__ = 'item_allergens'

    id = db.Column(db.Integer, primary_key=True)
    item_id = db.Column(db.Integer, db.ForeignKey('items.id'), nullable=False)
    allergen_id = db.Column(db.Integer, db.ForeignKey('allergens.id'), nullable=False)
    notes = db.Column(db.String)

    item = db.relationship('Item', back_populates = 'item_allergens')
    allergen = db.relationship('Allergen', back_populates = 'item_allergens')

    serialize_rules = ('-item.item_allergens', '-allergen.item_allergens')


    def __repr__(self):
        return f'<ItemAllergen {self.id} item_id={self.item_id}, allergen_id={self.allergen_id}>'

class Allergen(db.Model, SerializerMixin):
    __tablename__ = 'allergens'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String)

    item_allergens = db.relationship('ItemAllergen', back_populates = 'allergen')
    serialize_rules = ('-item_allergens.allergen',)

    def __repr__(self):
        return f'<Allergen {self.id} {self.name}>'

class CategoryItem(db.Model, SerializerMixin):
    __tablename__ = 'category_items'

    id = db.Column(db.Integer, primary_key=True)
    item_id = db.Column(db.Integer, db.ForeignKey('items.id'), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'))

    item = db.relationship('Item', back_populates = 'category_item')
    category = db.relationship('Category', back_populates = 'category_items')

    serialize_rules = ('-item.category_item', '-category.category_items')

class Category(db.Model, SerializerMixin):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    menu_id = db.Column(db.Integer, db.ForeignKey('menus.id'), nullable=False)
 
    category_items = db.relationship('CategoryItem', back_populates = 'category') 
    menu = db.relationship('Menu', back_populates = 'categories')

    serialize_rules = ('-menu.categories', '-category_items.category')


class Menu(db.Model, SerializerMixin):
    __tablename__ = 'menus'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)

    categories = db.relationship('Category', back_populates='menu')

    serialize_only = ('id','name', 'categories.name', 'categories.category_items.item.id','categories.category_items.item.name')
    # serialize_rules = ('-categories.menu',)