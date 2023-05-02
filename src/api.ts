import { Lot, LotId } from "typings/lot";

const lots: Lot[] = [
  {
    id: 0,
    name: "Apple",
    description: "Apple description",
    price: 16,
    favorite: true,
  },
  {
    id: 1,
    name: "Orange",
    description: "Orange description",
    price: 41,
    favorite: false,
  },
];

interface Api {
  get(url: string): Promise<Lot[]> | void;
  post(url: string): Promise<void>;
}

export const api: Api = {
  get(url: string): Promise<Lot[]> | void {
    switch (url) {
      case "/lots":
        return new Promise((resolve) => {
          setTimeout(() => resolve(lots), 1000);
        });

      default:
        throw new Error("unexpected route");
    }
  },
  post(url: string): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 300);
    });
  },
};

export const stream = {
  listeners: new Map(),
  getRandomValue() {
    return Math.round(Math.random() * 10 + 30);
  },
  subscribe(
    listener: string,
    callback: (value: { id: LotId; price: number }) => void
  ) {
    this.listeners.set(listener, callback);
  },
  dispatchEvent() {
    this.listeners.forEach((callback, channel) => {
      callback({
        id: Number(/price-(\d+)/.exec(channel)?.[1]),
        price: this.getRandomValue(),
      });
    });
  },
};

setInterval(() => {
  stream.dispatchEvent();
}, 600);
