export interface IMap {
  url: string;
  objectsKey: string;
  propertiesKey: string;
}

export interface IMapJson {
  [key: string]: IMap;
}
