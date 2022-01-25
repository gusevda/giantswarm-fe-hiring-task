import delay from '../../utils/dalay';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

/**
 * Adds additional properties to the apps fetched from the API
 */
function decorateApps(apps: IAppFromAPI[]): IApp[] {
  return apps.map((app) => {
    return Object.assign(app, { slug: `${app.name}-${app.id}` });
  });
}
interface IHttpException {
  statusCode: number;
  message: string;
}
type IAppFromAPI = Omit<IApp, 'slug'>;
type JSONResponse = IAppFromAPI[] | IHttpException;

export async function fetchApps() {
  const response = await fetch(`${SERVER_URL}/apps`);
  const data: JSONResponse = await response.json();

  if (response.ok) {
    return decorateApps(data as IAppFromAPI[]);
  } else {
    throw new Error((data as IHttpException).message);
  }
}
