export type Action<P = unknown, T extends string = string> = {
  type: T;
  payload: P;
};

export type Reducer<
  S extends object | undefined = undefined,
  A extends Action | undefined = Action
> = (state: S | undefined, action: A | null) => S;

type MergeReducer<T, A extends Action> = {
  [K in keyof T]: T[K] extends object ? Reducer<T[K], A> : never;
};

type Entry<O, K extends keyof O> = [K, O[K]];
type Entries<O> = Entry<O, keyof O>[];

export function combineReducers<S extends {}, A extends Action>(
  reducers: MergeReducer<S, A>
): Reducer<S, A> {
  return (state: S | undefined, action: A | null) => {
    const result = {} as S;

    (Object.entries(reducers) as Entries<MergeReducer<S, A>>).forEach(
      ([key, reducer]) => {
        result[key] = reducer(state?.[key], action);
      }
    );

    return result;
  };
}

export class Store<T extends object, A extends Action> {
  reducer: Reducer<T, A>;

  state: T;

  listeners = new Set<(state: T) => void>();

  constructor(reducer: Reducer<T, A>, state?: T | undefined) {
    this.reducer = reducer;
    this.state = reducer(state, null);
  }

  getState = (): T => {
    return this.state;
  };

  // changeState = (diff: Partial<T> | ((value: T) => Partial<T>)): void => {
  //   this.state = {
  //     ...this.state,
  //     ...(typeof diff === "function" ? diff(this.state) : diff),
  //   };

  //   this.listeners.forEach((listener) => listener(this.state));
  // };

  // setState = (state: T | ((value: T) => T)): void => {
  //   this.state = typeof state === "function" ? state(this.state) : state;

  //   this.listeners.forEach((listener) => listener(this.state));
  // };

  subscribe = (listener: (state: T) => void): (() => void) => {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  };

  unsubscribe = (listener: (state: T) => void): void => {
    this.listeners.delete(listener);
  };

  dispatch = (action: A) => {
    this.state = this.reducer(this.state, action);

    this.listeners.forEach((listener) => listener(this.state));
  };
}
