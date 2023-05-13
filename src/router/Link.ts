import { ComponentReturnType } from "typings/components";
import { connect } from "../store/createStore";
import { VDom } from "../createElement";
import { store as appStore } from "../store/index";
import { setLocationAction } from "../store/location/actions";

interface DispatchProps {
  navigate: (location: string) => void;
}

interface OwnProps {
  to: string;
  children: string;
  className?: string;
  store: typeof appStore;
}

type LinkProps = DispatchProps & OwnProps;
function Link({
  to,
  children,
  className,
  navigate,
}: LinkProps): ComponentReturnType {
  const onClick = (event: MouseEvent): void => {
    event.preventDefault();
    navigate(to);
  };

  return VDom.createElement(
    "a",
    {
      className,
      href: `#${to}`,
      onClick,
    },
    children
  );
}

const mapDispatchToProps = (dispatch: (typeof appStore)["dispatch"]) => ({
  navigate: (location: string) => {
    dispatch(setLocationAction(location));
  },
});

export default connect<typeof appStore, null, DispatchProps, OwnProps>(
  null,
  mapDispatchToProps
)(Link);
