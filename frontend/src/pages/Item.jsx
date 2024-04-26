import React, { useEffect, useState } from 'react';
import { Link, useOutletContext, useParams } from 'react-router-dom';
import ItemAllergens from '../ItemAllergens';

function Item() {
  const { id } = useParams();
  const [item, setItem] = useState({});
  useEffect(() => {
    fetch(`http://127.0.0.1:5555/items/${id}`)
      .then((res) => res.json())
      .then((menuData) => {
        setItem(menuData);
      });
  }, []);
  {
  }
  return (
    <div id="itemDetails">
      <Link to="/" className="backLink">
        ◁ Back
      </Link>
      {item['image'] && (
        <div id="imageFrame">
          <img src={item.image} />
        </div>
      )}
      <h2>{item.name}</h2>
      <p className="sectionHeader">Description</p>
      <p>{item.description}</p>
      <p className="sectionHeader">Allergens</p>

      {item.allergens && <ItemAllergens item={item} />}

      <p className="sectionHeader">Mise</p>
      <p>{item.mise}</p>
      <p className="sectionHeader">Available</p>
      <ul>
        {item.menus && item.menus.map((menu) => <li key={menu}>{menu}</li>)}
      </ul>
    </div>
  );
}

export default Item;
