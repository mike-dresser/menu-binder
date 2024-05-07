import { useContext, useEffect, useState } from 'react';
import api from '../../services/api-client';
import { EditModeContext } from '../../App';
import { HiOutlinePencil } from 'react-icons/hi';
import ItemAllergens from './ItemAllergens';
import NewItemAllergenList from '../NewItem/NewItemAllergenList';
import NewItemCategoryList from '../NewItem/NewItemCategoryList';
import Confirm from '../../components/Confirm';

function EditableList({ field, item, setItem }) {
  const editMode = useContext(EditModeContext);
  const [enableEdit, setEnableEdit] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    allergens: [],
    mise: '',
    price: 0,
    categories: [],
    active: true,
    image: '',
  });

  useEffect(() => {
    setNewItem({ ...item });
  }, [editMode]);

  async function onSubmit(field) {
    let content = {};
    if (field === 'itemAllergens') {
      content = { allergens: newItem.allergens };
    } else if (field === 'itemCategories') {
      content = { categories: newItem.categories };
    }
    const response = await api.patch(`/items/${item.id}`, content);
    setEnableEdit(false);
    setItem({ ...item, ...content });
  }

  function onCancel() {
    setEnableEdit(false);
  }

  return (
    <div className="editableField">
      {editMode && enableEdit ? (
        field === 'itemAllergens' ? (
          <NewItemAllergenList newItem={newItem} setNewItem={setNewItem} />
        ) : (
          field === 'itemCategories' && (
            <NewItemCategoryList newItem={newItem} setNewItem={setNewItem} />
          )
        )
      ) : field === 'itemAllergens' ? (
        item.allergens && <ItemAllergens item={item} />
      ) : (
        field === 'itemCategories' && (
          <ul>
            {item.categories &&
              item.categories.map(({ category, menu }) => (
                <li key={category.id}>{menu.name}</li>
              ))}
          </ul>
        )
      )}
      {editMode &&
        (enableEdit ? (
          <Confirm onConfirm={() => onSubmit(field)} onCancel={onCancel} />
        ) : (
          <span className="editGlyph" onClick={() => setEnableEdit(true)}>
            <HiOutlinePencil />
          </span>
        ))}
    </div>
  );
}

export default EditableList;
