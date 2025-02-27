export interface AdsetModule {
  type: string;
  name: string;
  probability: number;
}

export interface AdsetTree {
  [key: string]: { [key: string]: AdsetModule[] };
}