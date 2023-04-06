import {
  ComponentType,
  ComponentProps,
  ComponentReturnType,
  ComponentChildren,
} from "typings/components";

export const VDom = {
  createElement(
    type: ComponentType,
    // eslint-disable-next-line default-param-last
    { key, ...props }: Omit<ComponentProps, "children"> & { key?: string } = {},
    ...children: ComponentChildren | ComponentChildren[]
  ): ComponentReturnType {
    if (children.length === 1 && Array.isArray(children[0])) {
      // eslint-disable-next-line prefer-destructuring
      props.children = children[0];
    } else {
      props.children = children;
    }

    return { type, key, props };
  },
};
