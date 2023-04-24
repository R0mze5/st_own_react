import { Lot, LotId } from "typings/lot";

import { App } from "./createComponents";
import { api, stream } from "./api";
import { render } from "./render";
import { VDom } from "./createElement";
import { State, store } from "./store/index";
import {
  createTimeAction,
  createSetLotsAction,
  createSetLotPriceAction,
} from "./store/actions";

function renderView(appState: State) {
  const rootElement = document.getElementById("root");
  if (rootElement) {
    render(VDom.createElement(App, { state: appState }), rootElement);
  }
}

store.subscribe((state) => {
  renderView(state);
});

renderView(store.getState());

setInterval(() => {
  store.dispatch(createTimeAction({ time: new Date() }));
}, 1000);

api.get("/lots")?.then((lots) => {
  store.dispatch(createSetLotsAction({ lots }));

  const onPrice = (data: { id: LotId; price: number }) => {
    store.dispatch(createSetLotPriceAction({ id: data.id, price: data.price }));
  };

  lots.forEach((lot) => {
    stream.subscribe(`price-${lot.id}`, onPrice);
  });
});
