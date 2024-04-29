import React from 'react';

function NewItem() {
  return (
    <form id="newItem">
      <div id="newImage">
        <button>+</button>
        <p>Add a new photo.</p>
      </div>
      <p className="sectionHeader">Name</p>
      <input type="text" name="name"></input>
      <p className="sectionHeader">Description</p>
      <textarea name="description"></textarea>
      <p className="sectionHeader">Allergens</p>
      <p className="sectionHeader">Mise</p>
      <input type="text" name="mise"></input>
      <p className="sectionHeader">Available</p>
      <input type="submit" value="Add New Item"></input>
    </form>
  );
}

export default NewItem;
