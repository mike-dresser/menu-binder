import React, { useContext, useState } from 'react';
import { EditModeContext } from './App';

function Field({ children }) {
  const editMode = useContext(EditModeContext);
  const [enableEdit, setEnableEdit] = useState(false);

  return (
    <>
      {enableEdit ? (
        <EditField content={children} />
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

function EditField({ content }) {
  const [newContent, setNewContent] = useState(content);
  function onTextChange(e) {
    setNewContent(e.target.value);
  }
  return (
    <div className="fieldEdit">
      <textarea value={newContent} onChange={onTextChange} />
      <div>
        <span>✔︎</span>
        <span>𐄂️</span>
      </div>
    </div>
  );
}

export default Field;
