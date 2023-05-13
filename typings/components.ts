export type ComponentType = string | Function;

export type ComponentChildren =
  // | ComponentReturnType
  // | string
  Array<ComponentReturnType | string>;

export type ComponentProps = {
  className?: string;
  id?: string;
  children?: ComponentChildren;
  [key: string]: any;
};

export type ComponentReturnType<Props = {}> = {
  type: ComponentType;
  key?: string;
  props: ComponentProps & Props;
} | null;

//

export type VirtualComponentReturnType =
  | {
      type: string;
      key?: string;
      props: ComponentProps;
    }
  | string
  | null;
