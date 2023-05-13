import { ComponentReturnType } from "typings/components";
import { VDom } from "../createElement";
import { store as appStore } from "../store/index";
import Link from "./Link";
import Location from "./Location";
import { routerPaths } from "./paths";
import Switch from "./Switch";
import { setLocationAction } from "../store/location/actions";

interface RouterProps {
  store: typeof appStore;
}
/**
 *
 * @param basepath used for subdomains
 * @returns
 */
function createBrowserHistory(basepath?: string) {
  return {
    get location() {
      const { state } = window.history;
      return state ? state.location : window.location.pathname;
    },
    push(location: string) {
      const state = { location };
      window.history.pushState(state, "", location);
      window.dispatchEvent(new PopStateEvent("popstate", { state }));
    },
    createHref(path: string) {
      return path;
    },
    listen(listener: (location: string) => void) {
      const stateListener = (event: PopStateEvent) => {
        const { state } = event;
        listener(state ? state.location : window.location.pathname);
      };

      window.addEventListener("popstate", stateListener, false);

      return () => {
        window.removeEventListener("popstate", stateListener);
      };
    },
  };
}
/**
 *
 * @param basepath used for subdomains
 * @returns
 */
function createHashHistory(basepath?: string) {
  return {
    get location() {
      return window.location.hash.slice(1) ?? "/";
    },
    push(location: string) {
      window.location.hash = location;
    },
    createHref(path: string) {
      return `#${path}`;
    },
    listen(listener: (location: string) => void) {
      const hashListener = () => {
        listener(window.location.hash.slice(1) ?? "/");
      };

      window.addEventListener("hashchange", hashListener, false);

      return () => {
        window.removeEventListener("hashchange", hashListener);
      };
    },
  };
}

function Routes({ store }: RouterProps): ComponentReturnType {
  window.onhashchange = () => {
    store.dispatch(
      setLocationAction(
        window.location.hash.replace("#", "") ?? routerPaths.home
      )
    );
  };

  return VDom.createElement(
    Switch,
    { store, className: "router__tabs" },

    VDom.createElement(
      Location,
      { path: routerPaths.home, store, exact: true },
      VDom.createElement(
        "p",
        {
          className: "router__tabs__content",
        },
        "Content Home"
      )
    ),
    VDom.createElement(
      Location,
      { path: routerPaths.lots, store, exact: true },
      VDom.createElement(
        "p",
        {
          className: "router__tabs__content",
        },
        "Content Lots"
      )
    ),
    VDom.createElement(
      Location,
      { path: routerPaths.help, store, exact: true },
      VDom.createElement(
        "p",
        {
          className: "router__tabs__content",
        },
        "Content Help"
      )
    ),
    VDom.createElement(
      Location,
      { path: routerPaths.notFound, store },
      VDom.createElement(
        "p",
        {
          className: "router__tabs__content",
        },
        "Not Found"
      )
    )
  );
}

export default function Router({ store }: RouterProps): ComponentReturnType {
  return VDom.createElement(
    "div",
    { className: "router" },
    VDom.createElement(
      "p",
      { className: "router__links" },
      VDom.createElement(
        Link,
        {
          className: "router__link",
          to: routerPaths.home,
          store,
        },
        "home"
      ),
      VDom.createElement(
        Link,
        {
          className: "router__link",
          to: routerPaths.lots,
          store,
        },
        "lots"
      ),
      VDom.createElement(
        Link,
        {
          className: "router__link",
          to: routerPaths.help,
          store,
        },
        "help"
      ),
      VDom.createElement(
        Link,
        {
          className: "router__link",
          to: routerPaths.some,
          store,
        },
        "not exists"
      )
    ),
    VDom.createElement(
      "div",
      { className: "router__tabs" },
      VDom.createElement(Routes, { store })
    )
  );
}
