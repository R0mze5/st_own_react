export type Action<P = unknown, T extends string = string> = {
  type: T;
  payload: P;
};

export type ActionCreator<V = unknown, T extends string = string> = (
  payload: V
) => Action<V, T>;

export type Reducer<
  S extends object | undefined = undefined,
  A extends Action | undefined = Action
> = (state: S | undefined, action: A | null) => S;
