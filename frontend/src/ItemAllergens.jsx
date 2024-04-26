import { useState } from 'react';
import Dialog from './Dialog';

function ItemAllergens({ item }) {
  const [noteOpen, setNoteOpen] = useState(false);
  const [selectedAllergen, setSelectedAllergen] = useState({});

  function displayAllergenInfo(allergen) {
    setSelectedAllergen({ ...allergen });
    setNoteOpen(true);
  }

  return (
    <div className="dialogContainer">
      {noteOpen && (
        <Dialog
          boxState={noteOpen}
          setBoxState={setNoteOpen}
          title={selectedAllergen.name}
          content={selectedAllergen.notes}
        />
      )}

      <ul id="allergenContainer">
        {item.allergens.map((allergen) => (
          <li className="allergen" key={allergen.name}>
            <span className={`${allergen.name}Item`}>{allergen.name}</span>

            {allergen.notes && (
              <span
                className="infoGlyph"
                onClick={() => displayAllergenInfo(allergen)}
              >
                ℹ︎
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItemAllergens;
