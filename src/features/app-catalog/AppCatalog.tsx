import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../constants/routes';
import { createPath } from '../../utils';

export default function AppCatalog() {
  return (
    <>
      <h1>App Catalog</h1>
      <div>
        <ul>
          <li>
            <Link to={createPath(AppRoutes.AppDetails, { slug: 'app-1-slug' })}>
              App 1
            </Link>
          </li>
          <li>
            <Link to={createPath(AppRoutes.AppDetails, { slug: 'app-2-slug' })}>
              App 2
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
