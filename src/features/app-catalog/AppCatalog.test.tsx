import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import theme from '../../styles/theme';
import AppCatalog from './AppCatalog';
import appCatalogReducer from './appCatalogSlice';

const mockedUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUseNavigate,
}));

const appsFromAPI = [
  {
    id: 'prometheus',
    name: 'prometheus-operator-app-chart',
    slug: 'prometheus-operator-app-chart-prometheus',
    description: 'A Helm Chart for Prometheus Operator.',
    author: 'Giantswarm',
    version: '0.0.0',
  },
  {
    id: 'nginx',
    name: 'nginx-ingress-controller-app',
    slug: 'nginx-ingress-controller-app-nginx',
    description: 'A Helm chart for the nginx ingress-controller.',
    author: 'Kong',
    version: '0.1.0',
  },
];

const app1 = appsFromAPI[0];
const app2 = appsFromAPI[1];

jest.mock('./AppCatalogAPI', () => ({
  fetchApps: async function (): Promise<IApp[]> {
    return appsFromAPI;
  },
}));

async function setup() {
  const store = configureStore({
    reducer: {
      appCatalog: appCatalogReducer,
    },
  });

  const utils = render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <AppCatalog />
      </ThemeProvider>
    </Provider>
  );

  await waitFor(() =>
    expect(screen.getByTestId('app-list')).toBeInTheDocument()
  );

  return {
    ...utils,
  };
}

it('renders heading', async () => {
  await setup();

  expect(screen.getByText(/App Catalog/i)).toBeInTheDocument();
});

it('renders search form', async () => {
  await setup();

  expect(screen.getByPlaceholderText(/Search apps/i)).toBeInTheDocument();
});

it('renders filters', async () => {
  await setup();

  const filters = screen.getByTestId('filters');
  expect(within(filters).getByText('Filters')).toBeInTheDocument();
  expect(within(filters).getByText('By Author:')).toBeInTheDocument();
  expect(within(filters).getByText('Select author')).toBeInTheDocument();
  expect(within(filters).getByText('Giantswarm')).toBeInTheDocument();
  expect(within(filters).getByText('Kong')).toBeInTheDocument();
});

it('renders apps from the API', async () => {
  await setup();

  const appList = screen.getByTestId('app-list');

  expect(within(appList).getByText(app1.name)).toBeInTheDocument();
  expect(within(appList).getByText(app1.description)).toBeInTheDocument();

  expect(within(appList).getByText(app2.name)).toBeInTheDocument();
  expect(within(appList).getByText(app2.description)).toBeInTheDocument();
});

it('filters apps by author', async () => {
  await setup();

  const filters = screen.getByTestId('filters');
  userEvent.selectOptions(within(filters).getByRole('combobox'), [
    within(filters).getByText('Giantswarm'),
  ]);

  const appList = screen.getByTestId('app-list');

  expect(within(appList).getByText(app1.name)).toBeInTheDocument();
  expect(within(appList).getByText(app1.description)).toBeInTheDocument();

  expect(within(appList).queryByText(app2.name)).not.toBeInTheDocument();
  expect(within(appList).queryByText(app2.description)).not.toBeInTheDocument();
});

it('navigates to app details page when user clicks on app', async () => {
  await setup();

  userEvent.click(screen.getByText(appsFromAPI[0].name));
  expect(mockedUseNavigate).toBeCalledWith(`/apps/${appsFromAPI[0].slug}`);
});
