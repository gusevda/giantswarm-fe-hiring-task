import delay from '../../utils/dalay';
import { getIdFromSlug, decorateApp } from '../../utils/apps';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

type JSONResponse = IAppFromAPI | IHttpException;

export async function fetchApp(slug: string) {
  const id = getIdFromSlug(slug);
  // await delay(2000);
  const response = await fetch(`${SERVER_URL}/apps/${id}`);
  const data: JSONResponse = await response.json();

  if (response.ok) {
    return decorateApp(data as IAppFromAPI);
  } else {
    throw new Error((data as IHttpException).message);
  }
}

export async function fetchReadme(url: string) {
  // await delay(2000);
  const response = await fetch(url);
  const data = await response.text();

  if (response.ok) {
    return data;
  } else {
    throw new Error(`Failed to load URL: ${url}`);
  }
}
