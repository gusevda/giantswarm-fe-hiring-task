interface IApp {
  id: string;
  name: string;
  description: string;
  version: string;
  iconURL?: string;
  url?: string;
  readmeURL?: string;
  author?: string;
  slug: string;
}

type IAppCatalogFilters = { [key: string]: string };

interface ISelectOption {
  value: string;
  text: string;
}
