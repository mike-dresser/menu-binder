import React, { useState } from 'react';

function ImgUpload({ newItem, setNewItem }) {
  const [file, setFile] = useState();

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    fetch(`http://127.0.0.1:5555/`, {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.filename) {
          setNewItem({ ...newItem, image: `../public/${data.filename}` });
        }
      });
  }

  function handleChange(e) {
    if (e.target.value) {
      setFile(e.target.files[0]);
    }
  }

  function handleImgDelete() {
    setNewItem({ ...newItem, image: '' });
  }

  return (
    <div id="newImage">
      {newItem.image ? (
        <>
          <img src={newItem.image} />
          <span className="closeBtn" onClick={handleImgDelete}>
            ✖️
          </span>
        </>
      ) : (
        <form onSubmit={(event) => handleSubmit(event)}>
          <input onChange={handleChange} type="file" name="file" />
          {file && <input type="submit" value="Upload"></input>}
        </form>
      )}
    </div>
  );
}

export default ImgUpload;
