import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../constants/routes';

export default function NotFoundPage() {
  return (
    <>
      <h1>404</h1>
      <h2>Not Found</h2>
      Go to <Link to={AppRoutes.Home}>Home page</Link>
    </>
  );
}
