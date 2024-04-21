import React from 'react';

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
  image: './public/soup.jpg',
  menus: ['Dinner'],
  mise: 'Soup Spoon',
  name: 'Chilled Pepper Soup',
  price: null,
};

function Item() {
  return (
    <div id="itemDetails">
      {item.image && <img src={item.image} />}
      <h2>{item.name}</h2>
      <p className="sectionHeader">Description</p>
      <p>{item.description}</p>
      <p className="sectionHeader">Allergens</p>

      <ul id="allergenContainer">
        {item.allergens.map((allergen) => (
          <li className="allergen">
            <span>
              <span className={`${allergen.name}Item`}>{allergen.name}</span>
            </span>
            {allergen.notes ? <span className="infoGlyph">ℹ︎</span> : ''}
          </li>
        ))}
      </ul>

      <p className="sectionHeader">Mise</p>
      <p>{item.mise}</p>
      <p className="sectionHeader">Available</p>
      <ul>
        {item.menus.map((menu) => (
          <li>{menu}</li>
        ))}
      </ul>
    </div>
  );
}

export default Item;
