export interface MatchPathArgs {
  path: string;
  exact?: boolean;
}

export function matchPath(
  location: string,
  props: MatchPathArgs
): RegExpExecArray | null {
  const regexp = new RegExp(
    props.exact ? `^${props.path}$` : `^${props.path}(/.*)?`
  );
  return regexp.exec(location);
}
