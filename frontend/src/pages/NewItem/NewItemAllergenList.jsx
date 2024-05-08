import React, { useState, useEffect } from 'react';
import NewItemAllergen from './NewItemAllergen';
import api from '../../services/api-client';
import capitalize from '../../services/capitalize';

// This caches existing allergen names
let allAllergens = [];
const allergenDict = {};

function NewItemAllergenList({ newItem, setNewItem }) {
  const [filteredAllergens, setFilteredAllergens] = useState([]);
  // Query all existing allergens to populate select box
  useEffect(() => {
    if (!allAllergens.length) {
      const fetchAllergens = async () => {
        const allergens = await api.get('/allergens');
        allAllergens = allergens;
        createAllergenDict(allergens);
        setFilteredAllergens(allAllergens);
      };
      fetchAllergens();
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
    const itemAllergens = [...newItem.allergens];
    itemAllergens.push({
      name: e.target.value,
      id: allergenDict[e.target.value],
      notes: '',
    });
    setNewItem({ ...newItem, allergens: itemAllergens });
    e.target.value = '';
  }

  return (
    <div>
      <ul className="allergenContainer">
        {newItem.allergens &&
          newItem.allergens.map((allergen) => (
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
              {capitalize(allergen.name)}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default NewItemAllergenList;
