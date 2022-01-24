import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AppRoutes } from './constants/routes';

function App() {
  return (
    <div>
      <header>
        <Link to={AppRoutes.Home}>Home</Link>
        <nav>
          <Link to={AppRoutes.AppCatalog}>App Catalog</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
