import { ComponentReturnType } from "typings/components";
import { connect } from "../store/createStore";
import { State, store as appStore } from "../store/index";
import { VDom } from "../createElement";

interface ClockProps {
  readonly time: Date;
}
function Clock({ time }: ClockProps): ComponentReturnType {
  const isDay = time.getHours() >= 7 && time.getHours() < 21;

  return VDom.createElement(
    "div",
    {
      className: "clock",
    },
    VDom.createElement(
      "span",
      { className: "clock__value" },
      time.toLocaleTimeString()
    ),
    VDom.createElement("span", {
      className: `clock__icon clock__icon${isDay ? "--day" : "--night"}`,
    })
  );
}

interface StateProps {
  time: Date;
}

interface OwnProps {
  store: typeof appStore;
}

const clockMapStateToProps = (state: State) => ({
  time: state.clock.time,
});

export default connect<typeof appStore, StateProps, null, OwnProps>(
  clockMapStateToProps
)(Clock);
