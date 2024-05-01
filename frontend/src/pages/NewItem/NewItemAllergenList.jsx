import React, { useState, useEffect } from 'react';
import NewItemAllergen from './NewItemAllergen';

// This caches existing allergen names
let allAllergens = [];
const allergenDict = {};

function NewItemAllergenList({ newItem, setNewItem }) {
  const [filteredAllergens, setFilteredAllergens] = useState([]);

  // Query all existing allergens to populate select box
  useEffect(() => {
    if (!allAllergens.length) {
      fetch(`http://127.0.0.1:5555/allergens`)
        .then((res) => res.json())
        .then((allergenData) => {
          allAllergens = allergenData;
          createAllergenDict(allergenData);
          setFilteredAllergens(allAllergens);
        });
    }
    // Selected allergens are removed from select options
    let unselectedAllergens = allAllergens.filter((savedAllergen) => {
      let isSelected = false;
      for (let allergen of newItem.allergens) {
        if (allergen.name === savedAllergen.name) {
          isSelected = true;
        }
      }
      return !isSelected;
    });
    setFilteredAllergens(unselectedAllergens);
  }, [newItem]);

  function createAllergenDict(data) {
    // Create dictionary of saved allergen ids / names
    for (let entry of data) {
      allergenDict[entry.name] = entry.id;
    }
  }

  function onListChange(e) {
    // Add selected allergen to newItem
    console.log(e);
    const itemAllergens = [...newItem.allergens];
    itemAllergens.push({
      name: e.target.value,
      allergen_id: allergenDict[e.target.value],
      notes: '',
    });
    setNewItem({ ...newItem, allergens: itemAllergens });
    e.target.value = '';
  }

  return (
    <>
      <ul className="allergenContainer">
        {newItem.allergens.map((allergen) => (
          <NewItemAllergen
            allergen={allergen}
            key={allergen.name}
            newItem={newItem}
            setNewItem={setNewItem}
          />
        ))}
      </ul>
      <select name="allergens" onChange={onListChange}>
        <option value="">Select item allergens</option>
        {filteredAllergens.map((allergen) => {
          return (
            <option key={allergen.name} value={allergen.name} id={allergen.id}>
              {allergen.name}
            </option>
          );
        })}
      </select>
    </>
  );
}

export default NewItemAllergenList;
