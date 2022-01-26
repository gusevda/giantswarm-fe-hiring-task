import React from 'react';
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import Spinner from '../../components/Spinner';
import ErrorMessage from '../../components/ErrorMessage';
import { SectionHeading } from '../../styles/components';
import {
  fetchAppsAsync,
  setSearchQuery,
  setFilter,
  clearFilter,
  clearAllFilters,
  selectApps,
  selectStatus,
  selectSearchQuery,
  selectFilters,
} from './appCatalogSlice';
import AppList from './AppList';
import SearchForm from './SearchForm';
import Filters from './Filters';
import { forTablet, forDesktop } from '../../styles';
import filterApps from './filterApps';

const Layout = styled.div`
  ${forTablet} {
    display: grid;
    grid-template-columns: 240px auto;
    grid-template-rows: auto auto;
    column-gap: 36px;
    row-gap: 16px;
    align-items: start;
    grid-template-areas:
      '. search'
      'filters content';

    > *:nth-child(1) {
      grid-area: filters;
    }

    > *:nth-child(2) {
      grid-area: search;
    }

    > *:nth-child(3) {
      grid-area: content;
    }
  }

  ${forDesktop} {
    grid-template-columns: 320px auto;
  }
`;

const Content = styled.div`
  margin-top: 16px;

  ${forTablet} {
    margin-top: 0;
  }
`;

interface IFilteredAppsProps {
  apps: IApp[];
  searchQuery: string;
}

const FilteredApps: React.FC<IFilteredAppsProps> = ({ apps, searchQuery }) => {
  if (searchQuery.trim() !== '' && apps.length === 0) {
    return (
      <ErrorMessage>
        No applications found for the query - <strong>{searchQuery}</strong>
      </ErrorMessage>
    );
  }

  return <AppList apps={apps} />;
};

function getAuthorOptions(apps: IApp[]): ISelectOption[] {
  let authors: string[] = [];

  apps.forEach((app) => {
    if (app.author !== undefined && authors.indexOf(app.author) === -1) {
      authors.push(app.author);
    }
  });

  return authors.map((author) => ({
    value: author,
    text: author,
  }));
}

function useFilteredApps(
  apps: IApp[],
  searchQuery: string,
  filters: IAppCatalogFilters
) {
  const [filteredApps, setFilteredApps] = React.useState(apps);

  React.useEffect(() => {
    const res = filterApps(apps, searchQuery, filters);
    setFilteredApps(res);
  }, [searchQuery, filters, apps]);

  return [filteredApps];
}

export default function AppCatalog() {
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector(selectStatus);
  const apps = useAppSelector(selectApps);
  const searchQuery = useAppSelector(selectSearchQuery);
  const filters = useAppSelector(selectFilters);
  const [filteredApps] = useFilteredApps(apps, searchQuery, filters);

  React.useEffect(() => {
    dispatch(fetchAppsAsync());
  }, [dispatch]);

  const handleSearchQueryChange = React.useCallback(
    (value: string) => {
      dispatch(setSearchQuery(value));
    },
    [dispatch]
  );

  function handleSearchFormSubmit(value: string) {
    dispatch(setSearchQuery(value));
  }

  function handleFilterChange(key: string, value: string | null) {
    if (value === null) {
      dispatch(clearFilter(key));
    } else {
      dispatch(setFilter({ key, value }));
    }
  }

  function handleFiltersClear() {
    dispatch(clearAllFilters());
  }

  const authorOptions = getAuthorOptions(apps);

  return (
    <>
      <SectionHeading>App Catalog</SectionHeading>

      <Layout>
        <Filters
          filters={filters}
          authorOptions={authorOptions}
          onChange={handleFilterChange}
          onClear={handleFiltersClear}
        />
        <SearchForm
          onChange={handleSearchQueryChange}
          onSubmit={handleSearchFormSubmit}
        />
        <Content>
          {status === 'loading' ? <Spinner delay={300} /> : null}
          {status === 'idle' ? (
            <FilteredApps apps={filteredApps} searchQuery={searchQuery} />
          ) : null}
          {status === 'failed' ? (
            <ErrorMessage error={error}>
              Something bad happened while loading applications
            </ErrorMessage>
          ) : null}
        </Content>
      </Layout>
    </>
  );
}
