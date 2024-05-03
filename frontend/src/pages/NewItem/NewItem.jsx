import React, { useEffect, useState } from 'react';
import NewItemAllergenList from './NewItemAllergenList';
import NewItemCategoryList from './NewItemCategoryList';
import { useNavigate } from 'react-router-dom';
import ImgUpload from './ImgUpload';

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

  function onTextChange(e) {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  }

  function onSubmit(e) {
    e.preventDefault();
    fetch(`http://127.0.0.1:5555/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    })
      .then((res) => res.json())
      .then((data) => navigate(`/items/${data.id}`));
  }
  return (
    <>
      <p className="sectionHeader">Image</p>
      <ImgUpload newItem={newItem} setNewItem={setNewItem} />
      <form id="newItem" onSubmit={onSubmit}>
        <p className="sectionHeader">Name</p>
        <input
          type="text"
          name="name"
          value={newItem['name']}
          onChange={onTextChange}
        ></input>
        <p className="sectionHeader">Description</p>
        <textarea
          name="description"
          value={newItem['description']}
          onChange={onTextChange}
        ></textarea>
        <p className="sectionHeader">Allergens</p>
        <NewItemAllergenList newItem={newItem} setNewItem={setNewItem} />
        <p className="sectionHeader">Mise</p>
        <input
          type="text"
          name="mise"
          value={newItem['mise']}
          onChange={onTextChange}
        ></input>
        <p className="sectionHeader">Menu Categories</p>
        <NewItemCategoryList newItem={newItem} setNewItem={setNewItem} />
        <input type="submit" value="Add New Item"></input>
      </form>
    </>
  );
}

export default NewItem;
