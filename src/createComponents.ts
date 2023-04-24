import { ComponentReturnType } from "typings/components";
import { Lot } from "typings/lot";
import { VDom } from "./createElement";
import { State } from "./store/index";

function Logo(): ComponentReturnType {
  return VDom.createElement("img", { className: "logo", src: "./logo.svg" });
}

function Header(): ComponentReturnType {
  return VDom.createElement(
    "header",
    {
      className: "header",
    },
    VDom.createElement(Logo)
  );
}

interface ClockProps {
  readonly time: Date;
}
export function Clock({ time }: ClockProps): ComponentReturnType {
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

interface LotProps {
  readonly lot: Lot;
  readonly key: Lot["id"];
}
function LotComponent({ lot, key }: LotProps): ComponentReturnType {
  return VDom.createElement(
    "article",
    {
      className: "loading",
      key: key.toString(),
    },
    VDom.createElement(
      "div",
      {
        className: "lot__price",
      },
      lot.price.toString()
    ),
    VDom.createElement(
      "h5",
      {
        className: "lot__name",
      },
      lot.name
    ),
    VDom.createElement(
      "p",
      {
        className: "lot__description",
      },
      lot.description
    )
  );
}

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
}
function Lots({ lots }: LotsProps): ComponentReturnType {
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
      props: { lot, key: lot.id },
    }))
  );
}

interface AppProps {
  state: State;
}
export function App({ state }: AppProps): ComponentReturnType {
  return VDom.createElement(
    "div",
    {
      className: "app",
    },
    VDom.createElement(Header),
    VDom.createElement(Clock, { time: state.clock.time }),
    VDom.createElement(Lots, { lots: state.data.lots })
  );
}
