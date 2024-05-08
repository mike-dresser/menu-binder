import React, { useEffect, useState } from 'react';
import NewItemAllergenList from './NewItemAllergenList';
import NewItemCategoryList from './NewItemCategoryList';
import { useNavigate } from 'react-router-dom';
import ImgUpload from './ImgUpload';
import api from '../../services/api-client';

function NewItem() {
  const navigate = useNavigate();
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    allergens: [],
    mise: '',
    price: 0,
    categories: [],
    active: true,
    image: '',
  });

  useEffect(() => {
    if (newItem.id) {
      navigate(`../items/${newItem.id}`);
    }
  }, [newItem]);

  function onTextChange(e) {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  }

  function onSubmit(e) {
    e.preventDefault();
    const postItem = async () => {
      const response = await api.post('/items', newItem);
      setNewItem(response);
    };
    postItem();
  }

  return (
    <>
      <h3 className="sectionHeader">Image</h3>
      <ImgUpload newItem={newItem} setNewItem={setNewItem} />
      <form id="newItem" onSubmit={onSubmit}>
        <h3 className="sectionHeader">Name</h3>
        <input
          type="text"
          name="name"
          value={newItem['name']}
          onChange={onTextChange}
        ></input>
        <h3 className="sectionHeader">Description</h3>
        <textarea
          name="description"
          value={newItem['description']}
          onChange={onTextChange}
        ></textarea>
        <h3 className="sectionHeader">Allergens</h3>
        <NewItemAllergenList newItem={newItem} setNewItem={setNewItem} />
        <h3 className="sectionHeader">Mise</h3>
        <input
          type="text"
          name="mise"
          value={newItem['mise']}
          onChange={onTextChange}
        ></input>
        <h3 className="sectionHeader">Menu Categories</h3>
        <NewItemCategoryList newItem={newItem} setNewItem={setNewItem} />
        <input type="submit" value="Add New Item"></input>
      </form>
    </>
  );
}

export default NewItem;
