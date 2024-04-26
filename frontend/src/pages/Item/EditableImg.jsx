import React, { useContext, useState } from 'react';
import { EditModeContext } from '../../App';

function EditableImg({ children }) {
  const editMode = useContext(EditModeContext);
  const [enableEdit, setEnableEdit] = useState(false);

  return (
    <>
      {enableEdit ? (
        <EditField
          content="Upload new image..."
          setEnableEdit={setEnableEdit}
        ></EditField>
      ) : (
        <div className="editableField">
          {children}
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

function EditField({ content, setEnableEdit }) {
  const [newContent, setNewContent] = useState(content);
  function onTextChange(e) {
    setNewContent(e.target.value);
  }
  function onCancel() {
    setEnableEdit(false);
  }
  return (
    <div className="fieldEdit">
      <h2>
        <textarea value={newContent} onChange={onTextChange} />
      </h2>
      <div>
        <span>✔︎</span>
        <span onClick={onCancel}>𐄂️</span>
      </div>
    </div>
  );
}

export default EditableImg;
