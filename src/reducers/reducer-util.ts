// Redux Action
export interface Action {
  type: string,
};

// Reducer Type
export type Reducer<T> = (state: T, action: Action) => T;