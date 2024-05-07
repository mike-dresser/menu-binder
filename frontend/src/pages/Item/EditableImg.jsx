import React, { useContext, useState } from 'react';
import { EditModeContext } from '../../App';
import ImgUpload from '../NewItem/ImgUpload';
import { HiOutlinePencil } from 'react-icons/hi';
import Confirm from '../../components/Confirm';

function EditableImg({ children, itemField, item, setItem }) {
  const editMode = useContext(EditModeContext);
  const [enableEdit, setEnableEdit] = useState(false);

  return (
    <>
      {enableEdit ? (
        <EditField content={children} setEnableEdit={setEnableEdit}></EditField>
      ) : (
        <div className="editableField">
          {children}
          {editMode && (
            <span className="editGlyph" onClick={() => setEnableEdit(true)}>
              <HiOutlinePencil />
            </span>
          )}
        </div>
      )}
    </>
  );

  function EditField({ content, setEnableEdit }) {
    const [newContent, setNewContent] = useState(content);

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
        <ImgUpload newItem={item} setNewItem={setItem} />
        <Confirm onConfirm={onSubmit} onCancel={onCancel} />
      </div>
    );
  }
}

export default EditableImg;
