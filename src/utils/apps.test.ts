import { decorateApp, decorateApps, getIdFromSlug } from './apps';

const appFromAPI: IAppFromAPI = {
  id: 'appid',
  name: 'app-name',
  description: 'app description',
  version: '0.0.0',
};

const appsFromAPI: IAppFromAPI[] = [
  {
    id: 'app1id',
    name: 'app-1-name',
    description: 'app 1 description',
    version: '0.0.0',
  },
  {
    id: 'app2id',
    name: 'app-2-name',
    description: 'app 2 description',
    version: '0.0.0',
  },
];

describe('decorateApp', () => {
  it('adds slug to the app', () => {
    expect(decorateApp(appFromAPI)).toEqual({
      ...appFromAPI,
      slug: 'app-name-appid',
    });
  });
});

describe('decorateApps', () => {
  it('adds slug to each app in the array', () => {
    expect(decorateApps(appsFromAPI)).toEqual([
      {
        ...appsFromAPI[0],
        slug: 'app-1-name-app1id',
      },
      {
        ...appsFromAPI[1],
        slug: 'app-2-name-app2id',
      },
    ]);
  });
});

describe('getIdFromSlug', () => {
  it('correctly extracts id from a slug', () => {
    expect(getIdFromSlug('app1name-app1id')).toEqual('app1id');
    expect(getIdFromSlug('app-2-name-app2id')).toEqual('app2id');
    expect(getIdFromSlug('app2nameapp2id')).toEqual('app2nameapp2id');
    expect(getIdFromSlug('')).toEqual('');
  });
});
