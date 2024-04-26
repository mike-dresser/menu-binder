import React, { useEffect, useState } from 'react';
import { Link, useOutletContext, useParams } from 'react-router-dom';
import ItemAllergens from '../ItemAllergens';
import Field from '../Field';

function Item() {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const editMode = useOutletContext();
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
          <Field>
            <img src={item.image} />
          </Field>
        </div>
      )}

      <h2>
        <Field>{item.name}</Field>
      </h2>

      <p className="sectionHeader">Description</p>

      <p>
        <Field>{item.description}</Field>
      </p>

      <p className="sectionHeader">Allergens</p>

      <Field>{item.allergens && <ItemAllergens item={item} />}</Field>

      <p className="sectionHeader">Mise</p>

      <p>
        <Field>{item.mise}</Field>
      </p>

      <p className="sectionHeader">Available</p>
      <Field>
        <ul>
          {item.menus && item.menus.map((menu) => <li key={menu}>{menu}</li>)}
        </ul>
      </Field>
    </div>
  );
}

export default Item;
