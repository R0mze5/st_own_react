import { ComponentReturnType } from "typings/components";
import { LotId } from "typings/lot";
import { VDom } from "./createElement";
import { store as appStore } from "./store/index";
import { api } from "./api";
import { setLotFavorite, setLotUnfavorite } from "./store/actions";
import Clock from "./components/Clock";
import Lots from "./components/Lots";

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

interface AppProps {
  readonly store: typeof appStore;
}
export function App({ store }: AppProps): ComponentReturnType {
  return VDom.createElement(
    "div",
    {
      className: "app",
    },
    VDom.createElement(Header),
    VDom.createElement(Clock, { store }),
    VDom.createElement(Lots, { store })
  );
}
