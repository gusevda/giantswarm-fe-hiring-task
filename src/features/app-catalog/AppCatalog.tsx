import React from 'react';
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import Spinner from '../../components/Spinner';
import ErrorMessage from '../../components/ErrorMessage';
import { Box } from '../../styles/components';
import { fetchAppsAsync, selectApps, selectStatus } from './appCatalogSlice';
import AppList from './AppList';
import SearchInput from './SearchInput';
import Filters from './Filters';
import { forTablet } from '../../styles';

const AppListWrapper = styled(Box)`
  align-items: center;
  justify-content: center;
  min-height: 200px;
`;

const Layout = styled.div`
  ${forTablet} {
    display: grid;
    grid-template-columns: 240px auto;
    grid-template-rows: auto auto;
    column-gap: 16px;
    row-gap: 16px;
  }
`;

export default function AppCatalog() {
  const { status, error } = useAppSelector(selectStatus);
  const apps = useAppSelector(selectApps);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchAppsAsync());
  }, [dispatch]);

  return (
    <>
      <h1>App Catalog</h1>
      <Layout>
        <div />
        <SearchInput />
        <Filters />
        <AppListWrapper>
          {status === 'loading' ? <Spinner delay={300} /> : null}
          {status === 'idle' ? <AppList apps={apps} /> : null}
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
