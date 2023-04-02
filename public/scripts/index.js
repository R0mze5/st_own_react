import { App, Clock } from './createComponents.js';
import { api, stream } from './api.js';

let state = {
  time: new Date(),
  lots: null,
};

function render(newDom, realDomRoot) {
  // eslint-disable-next-line no-param-reassign
  realDomRoot.innerHTML = '';
  realDomRoot.append(newDom);
}

function renderView(appState) {
  render(App({ state: appState }), document.getElementById('root'));
}

renderView(state);

setInterval(() => {
  state = {
    ...state,
    time: new Date(),
  };

  renderView(state);
}, 1000);

api.get('/lots').then((lots) => {
  state = {
    ...state,
    lots,
  };

  renderView(state);

  const onPrice = (data) => {
    state = {
      ...state,
      lots: state.lots.map((lot) => {
        if (data.id === lot.id) {
          return {
            ...lot,
            price: data.price,
          };
        }

        return lot;
      }),
    };

    renderView(state);
  };

  lots.forEach((lot) => {
    stream.subscribe(`price-${lot.id}`, onPrice);
  });
});
