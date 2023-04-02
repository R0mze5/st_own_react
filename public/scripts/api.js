const lots = [
  {
    id: 0,
    name: 'Apple',
    description: 'Apple description',
    price: 16,
  },
  {
    id: 1,
    name: 'Orange',
    description: 'Orange description',
    price: 41,
  },
];

export const api = {
  get(url) {
    switch (url) {
      case '/lots':
        return new Promise((resolve) => {
          setTimeout(() => resolve(lots), 3000);
        });

      default:
        throw new Error('unexpected route');
    }
  },
};

export const stream = {
  listeners: new Map(),
  getRandomValue() {
    return Math.round(Math.random() * 10 + 30);
  },
  subscribe(listener, callback) {
    this.listeners.set(listener, callback);
  },
  dispatchEvent() {
    this.listeners.forEach(((callback, channel) => {
      callback({ id: Number(/price-(\d+)/.exec(channel)[1]), price: this.getRandomValue() });
    }));
  },
};

setInterval(() => {
  stream.dispatchEvent();
}, 600);
