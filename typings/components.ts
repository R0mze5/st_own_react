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

export interface ComponentReturnType {
  type: ComponentType;
  key?: string;
  props?: ComponentProps;
}

//

export type VirtualComponentReturnType =
  | {
      type: string;
      key?: string;
      props?: ComponentProps;
    }
  | string;
