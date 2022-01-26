/**
 * Generates slug from name and id
 */
function getSlug(name: string, id: string) {
  return `${name}-${id}`;
}

/**
 * Adds additional properties to the app fetched from the API
 */
export function decorateApp(app: IAppFromAPI): IApp {
  return Object.assign(app, { slug: getSlug(app.name, app.id) });
}

/**
 * Adds additional properties to the apps fetched from the API
 */
export function decorateApps(apps: IAppFromAPI[]): IApp[] {
  return apps.map(decorateApp);
}

/**
 * Extracts app id from slug
 */
export function getIdFromSlug(slug: string) {
  const parts = slug.split('-');
  return parts[parts.length - 1] || '';
}
