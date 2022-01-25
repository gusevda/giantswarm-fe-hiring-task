/**
 * Filters a list of apps by name and description.
 */

export default function filterApps(apps: IApp[], searchQuery: string): IApp[] {
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
