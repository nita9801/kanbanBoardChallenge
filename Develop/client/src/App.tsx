import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';
import React from 'react';

function App() {

  return (
    <div className='container'>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default App
