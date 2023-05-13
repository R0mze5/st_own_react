import { ComponentReturnType } from "typings/components";
import { VDom } from "../createElement";
import { Action, Reducer } from "./lib/types";

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

export interface IStore<T extends object, A extends Action> {
  state: T;
  getState: () => T;
  dispatch: (action: A) => void;
}

export class Store<T extends object, A extends Action> implements IStore<T, A> {
  private reducer: Reducer<T, A>;

  state: T;

  private listeners = new Set<(state: T) => void>();

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

  dispatch = (action: A): void => {
    this.state = this.reducer(this.state, action);

    this.listeners.forEach((listener) => listener(this.state));
  };
}

export function connect<
  S extends IStore<object, any>,
  SP extends object | null,
  DP extends object | null | undefined,
  OP extends {
    store: S;
  } & object
>(
  mapStateToProps: ((s: S["state"]) => SP) | null,
  mapDispatchToProps?: (d: S["dispatch"]) => DP
) {
  return (WrappedComponent: (props: SP & DP & OP) => ComponentReturnType) => {
    return ({ store, ...ownProps }: { store: S }) => {
      // we can replace it on class component with method "render" to remove store.subscribe from /src/index.ts
      const el = () => {
        const state = store.getState();

        return VDom.createElement(WrappedComponent, {
          ...ownProps,
          ...(mapStateToProps ? mapStateToProps(state) : {}),
          ...(mapDispatchToProps ? mapDispatchToProps(store.dispatch) : {}),
          store,
        });
      };

      return VDom.createElement(el);
    };
  };
}
