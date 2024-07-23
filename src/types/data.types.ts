export type ListDataModel = {
  date: string;
  name: string;
  type: string | string[];
  team: string | string[] | null;
};

export type DataModel = {
  count: number;
  results: ListDataModel[];
};

export type ListRow = {
  id: string;
  date: string;
  name: string;
  type: string[];
};
