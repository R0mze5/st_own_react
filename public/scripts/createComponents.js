function Logo() {
  const logo = document.createElement('img');
  logo.className = 'logo';
  logo.src = './logo.svg';
  return logo;
}

function Header() {
  const header = document.createElement('header');
  header.className = 'header';
  header.append(Logo());
  return header;
}

export function Clock({ time }) {
  const clock = document.createElement('div');
  clock.className = 'clock';

  const value = document.createElement('span');
  value.className = 'clock__value';
  value.innerText = time.toLocaleTimeString();
  clock.append(value);

  const icon = document.createElement('span');
  icon.className = 'clock__icon';
  if (time.getHours() >= 7 && time.getHours() < 21) {
    icon.classList.add(`${icon.className}--day`);
  } else {
    icon.classList.add(`${icon.className}--night`);
  }
  // icon.innerText = time.toLocaleTimeString();
  clock.append(icon);

  return clock;
}

function Lot({ lot }) {
  const node = document.createElement('article');
  node.className = 'lot';

  const lotPrice = document.createElement('div');
  lotPrice.className = 'lot__price';
  lotPrice.innerText = lot.price;
  node.append(lotPrice);

  const lotName = document.createElement('h2');
  lotName.className = 'lot__name';
  lotName.innerText = lot.name;
  node.append(lotName);

  const lotDescription = document.createElement('p');
  lotDescription.className = 'lot__description';
  lotDescription.innerText = lot.description;

  node.append(lotDescription);
  return node;
}

function Loading() {
  const node = document.createElement('div');
  node.className = 'loading';
  node.innerText = 'Loading...';
  return node;
}

function Lots({ lots }) {
  if (!lots) {
    return Loading();
  }

  const node = document.createElement('div');
  node.className = 'lots';
  lots.forEach((lot) => {
    node.append(Lot({ lot }));
  });

  return node;
}

export function App({ state }) {
  const app = document.createElement('div');
  app.className = 'app';
  app.append(Header());
  app.append(Clock({ time: state.time }));
  app.append(Lots({ lots: state.lots }));
  return app;
}
