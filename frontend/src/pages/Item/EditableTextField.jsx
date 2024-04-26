import React, { useContext, useState } from 'react';
import { EditModeContext } from '../../App';

function EditableTextField({ children }) {
  const editMode = useContext(EditModeContext);
  const [enableEdit, setEnableEdit] = useState(false);

  return (
    <>
      {enableEdit ? (
        <EditField content={children} setEnableEdit={setEnableEdit} />
      ) : (
        <div className="editableField">
          <p>{children}</p>
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
      <textarea value={newContent} onChange={onTextChange} />
      <div>
        <span>✔︎</span>
        <span onClick={onCancel}>𐄂️</span>
      </div>
    </div>
  );
}

export default EditableTextField;
