import React from 'react';
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import Spinner from '../../components/Spinner';
import ErrorMessage from '../../components/ErrorMessage';
import { Box } from '../../styles/components';
import { fetchAppsAsync, selectApps, selectStatus } from './appCatalogSlice';
import AppList from './AppList';

const AppListWrapper = styled(Box)`
  align-items: center;
  justify-content: center;
  min-height: 200px;
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
      <AppListWrapper>
        {status === 'loading' ? <Spinner delay={300} /> : null}
        {status === 'idle' ? <AppList apps={apps} /> : null}
        {status === 'failed' ? (
          <ErrorMessage error={error}>
            Something bad happened while loading applications
          </ErrorMessage>
        ) : null}
      </AppListWrapper>
    </>
  );
}
