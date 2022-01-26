import delay from '../../utils/dalay';
import { decorateApps } from '../../utils/apps';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

type JSONResponse = IAppFromAPI[] | IHttpException;

export async function fetchApps() {
  // await delay(2000);
  const response = await fetch(`${SERVER_URL}/apps`);
  const data: JSONResponse = await response.json();

  if (response.ok) {
    return decorateApps(data as IAppFromAPI[]);
  } else {
    throw new Error((data as IHttpException).message);
  }
}
