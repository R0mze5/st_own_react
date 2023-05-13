import { ComponentReturnType } from "typings/components";
import { connect } from "../store/createStore";
import { VDom } from "../createElement";
import { State, store as appStore } from "../store/index";
import { MatchPathArgs, matchPath } from "./utils";

interface StateProps {
  location: string;
}

interface OwnProps extends MatchPathArgs {
  store: typeof appStore;
  children: ComponentReturnType;
  computedMatch: RegExpExecArray | null;
}

type LocationProps = StateProps & OwnProps;

function Location({
  location,
  path,
  children,
  exact,
  computedMatch,
}: LocationProps): ComponentReturnType {
  if (computedMatch ?? matchPath(location, { path, exact })) {
    return VDom.createElement("div", {}, children);
  }

  return null;
}

const mapStateToProps = (state: State) => ({
  location: state.location.currentLocation,
});

export default connect<typeof appStore, StateProps, null, OwnProps>(
  mapStateToProps
)(Location);
