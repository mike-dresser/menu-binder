import React from 'react';
import { Link } from 'react-router-dom';
import ItemAllergens from './ItemAllergens';

const item = {
  active: true,
  allergens: [
    {
      name: 'allium',
      notes: '',
    },
    {
      name: 'shellfish',
      notes: 'red curry paste, cannot be omitted',
    },
    {
      name: 'nightshade',
      notes: '',
    },
    {
      name: 'dairy',
      notes: '',
    },
    {
      name: 'pork',
      notes: 'red curry paste, cannot be omitted',
    },
    {
      name: 'nuts',
      notes: '',
    },
  ],
  description:
    'Puree of canola, shallot, garlic, ginger, red curry paste, roasted red peppers, white wine, rice vinegar, vegetable stock, oat milk, EVOO Garnish: marinated blue crab (blue crab, lemon vinaigrette, fines herbs) + crispy shallot (GF)',
  id: 6,
  image: '../public/soup.jpg',
  menus: ['Dinner'],
  mise: 'Soup Spoon',
  name: 'Chilled Pepper Soup',
  price: null,
};

function Item() {
  return (
    <div id="itemDetails">
      <Link to="/" className="backLink">
        ◁ Back
      </Link>
      <div id="imageFrame">{item.image && <img src={item.image} />}</div>
      <h2>{item.name}</h2>
      <p className="sectionHeader">Description</p>
      <p>{item.description}</p>
      <p className="sectionHeader">Allergens</p>

      <ItemAllergens item={item} />

      <p className="sectionHeader">Mise</p>
      <p>{item.mise}</p>
      <p className="sectionHeader">Available</p>
      <ul>
        {item.menus.map((menu) => (
          <li key={menu}>{menu}</li>
        ))}
      </ul>
    </div>
  );
}

export default Item;
