import { ComponentReturnType } from "typings/components";
import { Lot } from "typings/lot";
import { VDom } from "../createElement";
import { State, store as appStore } from "../store/index";
import LotComponent from "./Lot";
import { connect } from "../store/createStore";

function Loading(): ComponentReturnType {
  return VDom.createElement(
    "div",
    {
      className: "loading",
    },
    "Loading..."
  );
}

interface LotsProps {
  readonly lots: Lot[] | null;
  readonly store: typeof appStore;
}
function Lots({ lots, store }: LotsProps): ComponentReturnType {
  if (!lots) {
    return VDom.createElement(Loading);
  }

  return VDom.createElement(
    "div",
    {
      className: "lots",
    },
    lots.map((lot) => ({
      type: LotComponent,
      props: { lot, key: lot.id, store },
    }))
  );
}

interface StateProps {
  readonly lots: Lot[] | null;
}

interface OwnProps {
  readonly store: typeof appStore;
}

const mapStateToProps = (state: State) => ({
  lots: state.data.lots,
});

export default connect<typeof appStore, StateProps, null, OwnProps>(
  mapStateToProps
)(Lots);
