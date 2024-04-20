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

    serialize_rules = ('-item_allergens.item',)

    def __repr__(self):
        return f'<Item {self.id} {self.name}>'

class ItemAllergen(db.Model, SerializerMixin):
    __tablename__ = 'item_allergens'

    id = db.Column(db.Integer, primary_key=True)
    item_id = db.Column(db.Integer, db.ForeignKey('items.id'), nullable=False)
    allergen_id = db.Column(db.Integer, db.ForeignKey('allergens.id'), nullable=False)
    available_mod = db.Column(db.String)

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
