import { useState } from 'react';
import Dialog from '../../Dialog';
import { HiOutlineInformationCircle } from 'react-icons/hi';

function ItemAllergens({ item }) {
  const [noteOpen, setNoteOpen] = useState(false);
  const [selectedAllergen, setSelectedAllergen] = useState({});

  function displayAllergenInfo(allergen) {
    setSelectedAllergen({ ...allergen });
    setNoteOpen(true);
  }

  function capitalize(str) {
    return str.slice(0, 1).toUpperCase() + str.slice(1);
  }

  return (
    <div className="dialogContainer">
      {noteOpen && (
        <Dialog
          boxState={noteOpen}
          setBoxState={setNoteOpen}
          title={capitalize(selectedAllergen.name)}
          content={selectedAllergen.notes}
        />
      )}

      <ul className="allergenContainer">
        {item.allergens.map((allergen) => (
          <li className="allergen" key={allergen.id}>
            <span className={`${allergen.name}Item`}>{allergen.name}</span>

            {allergen.notes && (
              <span
                className="infoGlyph"
                onClick={() => displayAllergenInfo(allergen)}
              >
                <HiOutlineInformationCircle />
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItemAllergens;
