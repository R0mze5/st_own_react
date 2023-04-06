import { ComponentReturnType } from 'typings/components';
import { Lot } from 'typings/lot';
import { State } from 'typings/state';

// function Block(props:any) {
//   return {
//     type: 'div',
//     props: { className: 'block',children: props.children, },
//   };
// }

function Logo():ComponentReturnType {
  // const logo = document.createElement('img');
  // logo.className = 'logo';
  // logo.src = './logo.svg';
  // return logo;

  // return new Element('img', { className: 'logo', src: './logo.svg' });

  return {
    type: 'img',
    props: { className: 'logo', src: './logo.svg' },
  };
}

function Header():ComponentReturnType {
  return {
    type: 'header',
    props: {
      className: 'header',
      children: [{
        type: Logo,
      }],
    },

  };
}

interface ClockProps {
 readonly time: Date
}
export function Clock({ time }:ClockProps):ComponentReturnType {
  const isDay = time.getHours() >= 7 && time.getHours() < 21;
  return {
    type: 'div',
    props: {
      className: 'clock',
      children: [
        {
          type: 'span',
          props: {
            className: 'clock__value',
            children: [time.toLocaleTimeString()],
          },
        },
        {
          type: 'span',
          props: {
            className: `clock__icon clock__icon${isDay ? '--day' : '--night'}`,
          },
        },
      ],
    },
  };
}

interface LotProps {
  readonly lot: Lot
}
function LotComponent({ lot }: LotProps):ComponentReturnType {
  return {
    type: 'article',
    props: {
      className: 'lot',
      key: lot.id.toString(),

      children: [
        {
          type: 'div',
          key: lot.id.toString(),
          props: {
            className: 'lot__price',
            children: [
              lot.price.toString(),
            ],
          },
        },
        {
          type: 'h5',
          props: {
            className: 'lot__name',
            children: [
              lot.name,
            ],
          },
        },
        {
          type: 'p',
          props: {
            className: 'lot__description',
            children: [
              lot.description,
            ],
          },
        },
      ],
    },
  };
}

function Loading():ComponentReturnType {
  return {
    type: 'div',
    props: {
      className: 'loading',
      children: [
        'Loading...',
      ],
    },
  };
}

interface LotsProps {
  readonly lots: Lot[] | null
}
function Lots({ lots }:LotsProps):ComponentReturnType {
  if (!lots) {
    return {
      type: Loading,
    };
  }

  return {
    type: 'div',
    props: {
      className: 'lots',
      children: lots.map((lot) => ({
        type: LotComponent,
        props: { lot },
      })),
    },
  };
}

interface AppProps {
  state: State
}
export function App({ state }: AppProps):ComponentReturnType {
  return {
    type: 'div',
    props: {
      className: 'app',
      children: [
        {
          type: Header,
        },
        {
          type: Clock,
          props: { time: state.time },
        },
        {
          type: Lots,
          props: { lots: state.lots },
        },
      ],
    },
  };
}
