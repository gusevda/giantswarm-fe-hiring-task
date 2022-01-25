import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import App from './App';
import { AppCatalogPage, AppDetailsPage, NotFoundPage } from './routes';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import * as serviceWorker from './serviceWorker';
import { AppRoutes } from './constants/routes';
import theme from './styles/theme';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path={AppRoutes.Home} element={<App />}>
              <Route index element={<Navigate to={AppRoutes.AppCatalog} />} />
              <Route path={AppRoutes.AppCatalog} element={<AppCatalogPage />} />
              <Route path={AppRoutes.AppDetails} element={<AppDetailsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
