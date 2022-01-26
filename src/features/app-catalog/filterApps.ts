/**
 * Filters a list of apps by name and description
 */
export function searchApps(apps: IApp[], searchQuery: string): IApp[] {
  const searchStr = searchQuery.trim().toLowerCase();
  const appsByName: IApp[] = [];
  const appsByDescription: IApp[] = [];

  apps.forEach((app) => {
    const name = app.name.toLowerCase();
    const description = app.description.toLowerCase();

    if (name.includes(searchStr)) {
      appsByName.push(app);
    } else if (description.includes(searchStr)) {
      appsByDescription.push(app);
    }
  });

  return appsByName.concat(appsByDescription);
}

/**
 * Filters a list of apps
 */
export default function filterApps(
  apps: IApp[],
  searchQuery: string,
  filters: IAppCatalogFilters
): IApp[] {
  let filteredApps = searchApps(apps, searchQuery);

  Object.keys(filters).forEach((filterKey) => {
    const filterValue = filters[filterKey];

    if (filterKey === 'author') {
      filteredApps = filteredApps.filter((app) => app.author === filterValue);
    }
  });

  return filteredApps;
}
