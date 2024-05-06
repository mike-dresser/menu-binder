import React, { useContext, useState } from 'react';
import { EditModeContext } from '../../App';
import api from '../../services/api-client';

function EditableTextField({ type = 'p', itemField, item, setItem, children }) {
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
          {React.createElement(type, { children })}
          {/* <p>{children}</p> */}
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
      <textarea value={newContent} onChange={onTextChange} />
      <div>
        <span onClick={onSubmit}>✔︎</span>
        <span onClick={onCancel}>𐄂️</span>
      </div>
    </div>
  );
}

export default EditableTextField;
