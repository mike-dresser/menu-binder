import { useState } from 'react';

function ItemAllergens({ item }) {
  const [noteOpen, setNoteOpen] = useState(false);
  const [selectedAllergen, setSelectedAllergen] = useState({});

  function displayAllergenInfo(allergen) {
    setSelectedAllergen({ ...allergen });
    setNoteOpen(true);
  }

  return (
    <div id="infoBoxContainer">
      <div className={noteOpen ? 'infoBox' : 'infoBox hidden'}>
        <span className="closeBtn" onClick={() => setNoteOpen(false)}>
          ✖️
        </span>
        <p className="sectionHeader">{selectedAllergen.name}</p>
        <p>{selectedAllergen.notes}</p>
      </div>
      <ul id="allergenContainer">
        {item.allergens.map((allergen) => (
          <li className="allergen" key={allergen.name}>
            <span>
              <span className={`${allergen.name}Item`}>{allergen.name}</span>
            </span>
            {allergen.notes ? (
              <span
                className="infoGlyph"
                onClick={() => displayAllergenInfo(allergen)}
              >
                ℹ︎
              </span>
            ) : (
              ''
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItemAllergens;
