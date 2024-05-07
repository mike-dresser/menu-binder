import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { EditModeContext } from '../../App';
import EditableTextField from './EditableTextField';
import EditableImg from './EditableImg';
import EditableList from './EditableList';
import ImgUpload from '../NewItem/ImgUpload';
import api from '../../services/api-client';
import { HiChevronLeft } from 'react-icons/hi';

function Item() {
  const editMode = useContext(EditModeContext);
  const { id } = useParams();
  const [item, setItem] = useState({});
  useEffect(() => {
    const fetchItem = async () => {
      const itemData = await api.get(`/items/${id}`);
      setItem(itemData);
    };
    fetchItem();
  }, []);
  {
  }
  return (
    <div id="itemDetails">
      <Link to="/" className="backLink">
        <span className="backBtn">
          <HiChevronLeft />
          Back
        </span>
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

      <EditableTextField
        type="h2"
        itemField="name"
        item={item}
        setItem={setItem}
      >
        {item.name}
      </EditableTextField>

      <p className="sectionHeader">Description</p>

      <EditableTextField itemField="description" item={item} setItem={setItem}>
        {item.description}
      </EditableTextField>

      <p className="sectionHeader">Allergens</p>

      <EditableList item={item}>{item.allergens}</EditableList>

      <p className="sectionHeader">Mise</p>

      <EditableTextField itemField="mise" item={item} setItem={setItem}>
        {item.mise}
      </EditableTextField>

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
