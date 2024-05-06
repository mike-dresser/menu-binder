import React, { useContext, useState } from 'react';
import { EditModeContext } from '../../App';
import api from '../../services/api-client';

function EditableH2({ children, itemField, item, setItem }) {
  const editMode = useContext(EditModeContext);
  const [enableEdit, setEnableEdit] = useState(false);

  return (
    <>
      {enableEdit ? (
        <EditField
          content={children}
          setEnableEdit={setEnableEdit}
          itemField={itemField}
          item={item}
          setItem={setItem}
        />
      ) : (
        <div className="editableField">
          <h2>{children}</h2>
          {editMode && (
            <span className="editGlyph" onClick={() => setEnableEdit(true)}>
              ✎
            </span>
          )}
        </div>
      )}
    </>
  );
}

function EditField({ content, setEnableEdit, itemField, item, setItem }) {
  const [newContent, setNewContent] = useState(content);
  function onTextChange(e) {
    setNewContent(e.target.value);
  }
  function onCancel() {
    setEnableEdit(false);
  }

  async function onSubmit() {
    const content = { [itemField]: newContent };
    await api.patch(`/items/${item.id}`, content);
    setEnableEdit(false);
    setItem({ ...item, ...content });
  }

  return (
    <div className="fieldEdit">
      <h2>
        <textarea value={newContent} onChange={onTextChange} />
      </h2>
      <div>
        <span onClick={onSubmit}>✔︎</span>
        <span onClick={onCancel}>𐄂️</span>
      </div>
    </div>
  );
}

export default EditableH2;
