import React from 'react';
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import Spinner from '../../components/Spinner';
import ErrorMessage from '../../components/ErrorMessage';
import { Box } from '../../styles/components';
import {
  fetchAppsAsync,
  setSearchQuery,
  selectApps,
  selectStatus,
  selectSearchQuery,
} from './appCatalogSlice';
import AppList from './AppList';
import SearchForm from './SearchForm';
import Filters from './Filters';
import { forTablet } from '../../styles';
import filterApps from './filterApps';

const Heading = styled.h1`
  font-size: 24px;
  margin-bottom: 48px;
`;

const AppListWrapper = styled(Box)`
  align-items: center;
  justify-content: center;
`;

const Layout = styled.div`
  ${forTablet} {
    display: grid;
    grid-template-columns: 240px auto;
    grid-template-rows: auto auto;
    column-gap: 16px;
    row-gap: 16px;
    grid-template-areas:
      '. search'
      'filters content';

    *:nth-child(1) {
      grid-area: search;
    }

    *:nth-child(2) {
      grid-area: filters;
    }

    *:nth-child(3) {
      grid-area: content;
    }
  }
`;

function useFilteredApps(apps: IApp[], searchQuery: string) {
  const [filteredApps, setFilteredApps] = React.useState(apps);

  React.useEffect(() => {
    const res = filterApps(apps, searchQuery);
    setFilteredApps(res);
  }, [searchQuery, apps]);

  return [filteredApps];
}

export default function AppCatalog() {
  const { status, error } = useAppSelector(selectStatus);
  const apps = useAppSelector(selectApps);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchAppsAsync());
  }, [dispatch]);

  const searchQuery = useAppSelector(selectSearchQuery);
  const [filteredApps] = useFilteredApps(apps, searchQuery);

  const handleSearchQueryChange = React.useCallback(
    (value: string) => {
      dispatch(setSearchQuery(value));
    },
    [dispatch]
  );

  function handleSearchFormSubmit(value: string) {
    dispatch(setSearchQuery(value));
  }

  return (
    <>
      <Heading>App Catalog</Heading>

      <Layout>
        <SearchForm
          onChange={handleSearchQueryChange}
          onSubmit={handleSearchFormSubmit}
        />
        <Filters />
        <AppListWrapper>
          {status === 'loading' ? <Spinner delay={300} /> : null}
          {status === 'idle' && filteredApps.length > 0 ? (
            <AppList apps={filteredApps} />
          ) : null}
          {status === 'idle' && filteredApps.length === 0 ? (
            <ErrorMessage>
              No applications found for the query -{' '}
              <strong>{searchQuery}</strong>
            </ErrorMessage>
          ) : null}
          {status === 'failed' ? (
            <ErrorMessage error={error}>
              Something bad happened while loading applications
            </ErrorMessage>
          ) : null}
        </AppListWrapper>
      </Layout>
    </>
  );
}
