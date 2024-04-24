import React from 'react';

function ItemFilter() {
  return (
    <form className="filterForm">
      <label>
        Vegetarian
        <input type="checkbox" name="vegetarian"></input>
      </label>
      <label>
        Vegan
        <input type="checkbox" name="vegan"></input>
      </label>
      <p className="sectionHeader">No</p>
      <label>
        Shellfish
        <input type="checkbox" name="shellfish"></input>
      </label>
      <label>
        Nuts
        <input type="checkbox" name="nuts"></input>
      </label>
      <label>
        Sesame
        <input type="checkbox" name="sesame"></input>
      </label>
      <label>
        Pork
        <input type="checkbox" name="pork"></input>
      </label>
      <label>
        Gluten
        <input type="checkbox" name="gluten"></input>
      </label>
      <label>
        Dairy
        <input type="checkbox" name="dairy"></input>
      </label>
      <label>
        Eggs
        <input type="checkbox" name="eggs"></input>
      </label>
      <label>
        Fish
        <input type="checkbox" name="fish"></input>
      </label>
      <label>
        Allium
        <input type="checkbox" name="allium"></input>
      </label>
      <label>
        Nightshade
        <input type="checkbox" name="nightshade"></input>
      </label>
      <input type="submit" value="Filter Items" />
    </form>
  );
}

export default ItemFilter;
