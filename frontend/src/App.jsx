import { Outlet } from 'react-router-dom';
import { createContext, useEffect, useState } from 'react';
import Header from './Header';

const EditModeContext = createContext(false);
function App() {
  const [editMode, setEditMode] = useState(false);
  return (
    <EditModeContext.Provider value={editMode}>
      <div id="main">
        <Header editMode={editMode} setEditMode={setEditMode} />
        <Outlet />
      </div>
    </EditModeContext.Provider>
  );
}

export default App;
export { EditModeContext };
