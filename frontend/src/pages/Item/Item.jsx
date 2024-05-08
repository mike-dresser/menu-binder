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

      <h3 className="sectionHeader">Description</h3>

      <EditableTextField itemField="description" item={item} setItem={setItem}>
        {item.description}
      </EditableTextField>

      <h3 className="sectionHeader">Allergens</h3>

      <EditableList field="itemAllergens" item={item} setItem={setItem} />

      <h3 className="sectionHeader">Mise</h3>

      <EditableTextField itemField="mise" item={item} setItem={setItem}>
        {item.mise}
      </EditableTextField>

      <h3 className="sectionHeader">Available</h3>
      <EditableList field="itemCategories" item={item} setItem={setItem} />
    </div>
  );
}

export default Item;
