import React, { useEffect, useState } from 'react';
import NewItemAllergenList from './NewItemAllergenList';

function NewItem() {
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    allergens: [],
    mise: '',
    menus: [],
    active: true,
  });

  function onTextChange(e) {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  }

  function onSubmit(e) {
    e.preventDefault();
    console.log(newItem);
  }
  return (
    <form id="newItem" onSubmit={onSubmit}>
      <p className="sectionHeader">Image</p>
      <div id="newImage">
        <input type="file" />
      </div>
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
      <p className="sectionHeader">Available</p>
      <input type="submit" value="Add New Item"></input>
    </form>
  );
}

export default NewItem;