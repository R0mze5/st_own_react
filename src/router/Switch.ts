import { ComponentReturnType } from "typings/components";
import { connect } from "../store/createStore";
import { State, store as appStore } from "../store/index";
import { matchPath } from "./utils";

interface StateProps {
  location: string;
}

interface OwnProps {
  children: ComponentReturnType<{ path: string; exact?: boolean }>[];
  store: typeof appStore;
}

type SwitchProps = StateProps & OwnProps;

function Switch({ children, location }: SwitchProps): ComponentReturnType {
  // eslint-disable-next-line no-restricted-syntax
  for (const child of children) {
    if (child) {
      const match = matchPath(location, child.props);
      if (match) {
        // React.cloneElement(child, {computedMatch: match})
        const currentChild = {
          ...child,
          props: {
            ...child.props,
            computedMatch: match,
          },
        };

        return currentChild;
      }
    }
  }

  return null;
}

const mapStateToProps = (state: State) => ({
  location: state.location.currentLocation,
});

export default connect<typeof appStore, StateProps, null, OwnProps>(
  mapStateToProps
)(Switch);
