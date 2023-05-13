import { ComponentReturnType } from "typings/components";
import { VDom } from "../createElement";
import { store as appStore } from "../store/index";
import Router from "../router/Router";

function Logo(): ComponentReturnType {
  return VDom.createElement("img", { className: "logo", src: "./logo.svg" });
}

interface HeaderProps {
  readonly store: typeof appStore;
}

export default function Header({ store }: HeaderProps): ComponentReturnType {
  return VDom.createElement(
    "header",
    {
      className: "header",
    },
    VDom.createElement(Logo),
    VDom.createElement(Router, { store })
  );
}
