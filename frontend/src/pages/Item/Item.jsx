import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { EditModeContext } from '../../App';
import ItemAllergens from './ItemAllergens';
import EditableTextField from './EditableTextField';
import EditableH2 from './EditableH2';
import EditableImg from './EditableImg';
import ImgUpload from '../NewItem/ImgUpload';

function Item() {
  const editMode = useContext(EditModeContext);
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
      {item['image'] ? (
        <EditableImg itemField="image" item={item} setItem={setItem}>
          <div id="imageFrame">
            <img src={item.image} />
          </div>
        </EditableImg>
      ) : editMode ? (
        <ImgUpload newItem={item} setNewItem={setItem} />
      ) : (
        ''
      )}

      <EditableH2 itemField="name" item={item} setItem={setItem}>
        {item.name}
      </EditableH2>

      <p className="sectionHeader">Description</p>

      <EditableTextField>{item.description}</EditableTextField>

      <p className="sectionHeader">Allergens</p>

      {item.allergens && <ItemAllergens item={item} />}

      <p className="sectionHeader">Mise</p>

      <EditableTextField>{item.mise}</EditableTextField>

      <p className="sectionHeader">Available</p>
      <ul>
        {item.categories &&
          item.categories.map((category) => (
            <li key={category.category.id}>{category.menu.name}</li>
          ))}
      </ul>
    </div>
  );
}

export default Item;
