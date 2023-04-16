import { State } from "typings/state";
import { LotId } from "typings/lot";

import { App } from "./createComponents";
import { api, stream } from "./api";
import { render } from "./render";
import { VDom } from "./createElement";
import { store } from "./store";

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
  store.changeState({
    time: new Date(),
  });
}, 1000);

api.get("/lots")?.then((lots) => {
  store.changeState({
    lots,
  });

  const onPrice = (data: { id: LotId; price: number }) => {
    store.changeState((state) => ({
      lots:
        state?.lots?.map((lot) => {
          if (data.id === lot.id) {
            return {
              ...lot,
              price: data.price,
            };
          }

          return lot;
        }) ?? null,
    }));
  };

  lots.forEach((lot) => {
    stream.subscribe(`price-${lot.id}`, onPrice);
  });
});
