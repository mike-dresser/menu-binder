import { useState } from 'react';
import Dialog from '../../Dialog';
import { HiOutlineInformationCircle } from 'react-icons/hi';
import capitalize from '../../services/capitalize';

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
          title={capitalize(selectedAllergen.name)}
          content={selectedAllergen.notes}
        />
      )}

      <ul className="allergenContainer">
        {item.allergens.map((allergen) => (
          <li className="allergen" key={allergen.id}>
            <span className={`${allergen.name}Item`}>
              {capitalize(allergen.name)}
            </span>

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
