import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { EditModeContext } from '../../App';

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
  function onSubmit() {
    fetch(`http://127.0.0.1:5555/items/${item.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ [itemField]: newContent }),
    }).then(() => {
      setEnableEdit(false);
      setItem({ ...item, [itemField]: newContent });
    });
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
