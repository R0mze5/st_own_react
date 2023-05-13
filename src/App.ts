import { ComponentReturnType } from "typings/components";
import { VDom } from "./createElement";
import { store as appStore } from "./store/index";
import Clock from "./components/Clock";
import Lots from "./components/Lots";
import Header from "./components/Header";

interface AppProps {
  readonly store: typeof appStore;
}
export default function App({ store }: AppProps): ComponentReturnType {
  return VDom.createElement(
    "div",
    {
      className: "app",
    },
    VDom.createElement(Header, { store }),
    VDom.createElement(Clock, { store }),
    VDom.createElement(Lots, { store })
  );
}
