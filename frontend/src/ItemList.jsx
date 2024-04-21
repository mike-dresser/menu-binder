import React from 'react';

function ItemList({ name, items }) {
  return (
    <>
      <h2>{name}</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </>
  );
}

export default ItemList;
