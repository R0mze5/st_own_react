import { State } from 'typings/state';
import { LotId } from 'typings/lot';

import { App, Clock } from './createComponents';
import { api, stream } from './api';
import { render } from './render';

let state:State = {
  time: new Date(),
  lots: null,
};

function renderView(appState:State) {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    render(App({ state: appState }), rootElement);
  }
}

renderView(state);

setInterval(() => {
  state = {
    ...state,
    time: new Date(),
  };

  renderView(state);
}, 1000);

api.get('/lots')?.then((lots) => {
  state = {
    ...state,
    lots,
  };

  renderView(state);

  const onPrice = (data: {id: LotId, price: number}) => {
    state = {
      ...state,
      lots: state?.lots?.map((lot) => {
        if (data.id === lot.id) {
          return {
            ...lot,
            price: data.price,
          };
        }

        return lot;
      }) ?? null,
    };

    renderView(state);
  };

  lots.forEach((lot) => {
    stream.subscribe(`price-${lot.id}`, onPrice);
  });
});
