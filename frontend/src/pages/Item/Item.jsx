import React, { useEffect, useState } from 'react';
import { Link, useOutletContext, useParams } from 'react-router-dom';
import ItemAllergens from './ItemAllergens';
import EditableTextField from './EditableTextField';
import EditableH2 from './EditableH2';
import EditableImg from './EditableImg';

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
        <EditableImg>
          <div id="imageFrame">
            <img src={item.image} />
          </div>
        </EditableImg>
      )}

      <EditableH2>{item.name}</EditableH2>

      <p className="sectionHeader">Description</p>

      <EditableTextField>{item.description}</EditableTextField>

      <p className="sectionHeader">Allergens</p>

      {item.allergens && <ItemAllergens item={item} />}

      <p className="sectionHeader">Mise</p>

      <EditableTextField>{item.mise}</EditableTextField>

      <p className="sectionHeader">Available</p>
      <ul>
        {item.menus && item.menus.map((menu) => <li key={menu}>{menu}</li>)}
      </ul>
    </div>
  );
}

export default Item;
