import { State } from "typings/state";

const initialState: State = {
  time: new Date(),
  lots: null,
};

export class Store<T extends object> {
  state: T;

  listeners = new Set<(state: T) => void>();

  constructor(state: T) {
    this.state = state;
  }

  getState(): T {
    return this.state;
  }

  changeState(diff: Partial<T> | ((value: T) => Partial<T>)): void {
    this.state = {
      ...this.state,
      ...(typeof diff === "function" ? diff(this.state) : diff),
    };

    this.listeners.forEach((listener) => listener(this.state));
  }

  subscribe(listener: (state: T) => void): void {
    this.listeners.add(listener);
  }
}

export const store = new Store<State>(initialState);
