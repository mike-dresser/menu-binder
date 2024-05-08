import Dialog from '../../components/Dialog';
import { useState } from 'react';
import { HiOutlineInformationCircle, HiX } from 'react-icons/hi';
import capitalize from '../../services/capitalize';
import Button from '../../components/Button';

function NewItemAllergen({ allergen, newItem, setNewItem }) {
  const [newAllergenNote, setNewAllergenNote] = useState('');
  const [noteOpen, setNoteOpen] = useState(false);

  function updateAllergenNote(allergen) {
    // Open dialog to edit allergen notes
    setNoteOpen(true);
    setNewAllergenNote(allergen.notes);
  }

  function addAllergenNote(allergen) {
    // Add allergen note to newItem.allergens
    const currentAllergens = [...newItem.allergens];
    for (let currentAllergen of currentAllergens) {
      if (currentAllergen.name === allergen.name) {
        currentAllergen.notes = newAllergenNote;
      }
    }
    setNewItem({ ...newItem, allergens: currentAllergens });
    setNewAllergenNote('');
    setNoteOpen(false);
  }

  function deleteAllergen(allergen) {
    // Remove a selected allergen
    const filteredAllergens = newItem.allergens.filter((current) => {
      return current.name != allergen.name;
    });
    setNewItem({ ...newItem, allergens: filteredAllergens });
  }

  return (
    <li className="allergen">
      <span className={`${allergen.name}Item`}>
        {capitalize(allergen.name)}
      </span>
      {noteOpen && (
        <Dialog
          boxState={noteOpen}
          setBoxState={setNoteOpen}
          title="Add Allergen Note"
          content={
            <>
              <textarea
                value={newAllergenNote}
                onChange={(e) => setNewAllergenNote(e.target.value)}
              ></textarea>
              <Button type="outline" action={() => addAllergenNote(allergen)}>
                Add
              </Button>
            </>
          }
        />
      )}
      {allergen.notes ? (
        <Button type="infoGlyph" action={() => updateAllergenNote(allergen)}>
          <HiOutlineInformationCircle />
        </Button>
      ) : (
        <Button type="infoGlyph" action={() => updateAllergenNote(allergen)}>
          ...
        </Button>
      )}
      <Button type="closeIcon" action={() => deleteAllergen(allergen)}>
        ️
        <HiX />
      </Button>
    </li>
  );
}

export default NewItemAllergen;
