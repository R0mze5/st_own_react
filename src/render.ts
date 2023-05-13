import {
  ComponentReturnType,
  VirtualComponentReturnType,
} from "typings/components";

function createRealNodeFromVirtual(
  virtualNode: VirtualComponentReturnType
): Node | null {
  if (!virtualNode) {
    return null;
  }

  if (typeof virtualNode === "string") {
    return document.createTextNode(virtualNode);
  }

  return document.createElement(virtualNode.type);
}

function sync(
  virtualNode: VirtualComponentReturnType,
  realNode: Node | null
): void {
  if (virtualNode === null || realNode === null) {
    realNode?.parentNode?.removeChild(realNode);
    return;
  }

  if (realNode instanceof HTMLElement) {
    // sync element
    if (typeof virtualNode !== "string") {
      if (virtualNode.props) {
        Object.entries(virtualNode.props).forEach(([name, value]) => {
          if (name === "children" || name === "key") {
            return;
          }

          if (typeof value === "function") {
            if (name.startsWith("on")) {
              if (name === "onClick") {
                realNode.onclick = value;
              }
            }
            return;
          }

          if (realNode.getAttribute(name) !== value) {
            if (name === "className") {
              realNode.setAttributeNS(null, "class", value);
            } else {
              realNode.setAttributeNS(null, name, value);
            }
          }
        });
      }
    }
  }

  if (
    realNode instanceof HTMLElement &&
    typeof virtualNode === "object" &&
    virtualNode.key
  ) {
    realNode.dataset.key = virtualNode.key;
  }

  // instead innerText
  if (typeof virtualNode !== "object") {
    realNode.nodeValue = virtualNode;
  }

  // sync child nodes

  const virtualChildren =
    typeof virtualNode === "object" ? virtualNode.props?.children ?? [] : [];

  const realChildren = realNode.childNodes;

  for (
    let index = 0;
    index < virtualChildren.length || index < realChildren.length;
    index++
  ) {
    const virtualChild = virtualChildren[index] as VirtualComponentReturnType;
    const realChild: Node = realChildren[index];
    // remove
    if (
      (virtualChild === undefined || virtualChild === null) &&
      realChild !== undefined
    ) {
      realNode.removeChild(realChild);
    }
    // update/replace

    if (
      virtualChild !== undefined &&
      virtualChild !== null &&
      realChild !== undefined
    ) {
      if (
        realChild instanceof HTMLElement &&
        (typeof virtualChild === "object" ? virtualChild.type : "") ===
          realChild.tagName.toLowerCase()
      ) {
        sync(virtualChild, realChild);
      } else {
        const newRealChild = createRealNodeFromVirtual(virtualChild);

        sync(virtualChild, newRealChild);

        if (newRealChild) {
          realNode.replaceChild(newRealChild, realChild);
        } else {
          realNode.removeChild(realChild);
        }
      }
    }

    // add

    if (
      virtualChild !== undefined &&
      virtualChild !== null &&
      (realChild === undefined || realChild === null)
    ) {
      const newRealChild = createRealNodeFromVirtual(virtualChild);

      if (newRealChild) {
        sync(virtualChild, newRealChild);

        realNode.appendChild(newRealChild);
      }
    }
  }
}

function evaluate(
  virtualNode: ComponentReturnType | string
): VirtualComponentReturnType {
  if (typeof virtualNode !== "object" || virtualNode === null) {
    return virtualNode;
  }

  if (typeof virtualNode.type === "function") {
    return evaluate(virtualNode.type(virtualNode.props));
  }

  const props = virtualNode?.props || {};
  return {
    ...virtualNode,
    props: {
      ...props,
      children: Array.isArray(props?.children)
        ? props.children.map(evaluate)
        : props.children
        ? [evaluate(props.children)]
        : [],
    },
  } as VirtualComponentReturnType;
}

export function render(
  virtualDom: ComponentReturnType,
  realDomRoot: HTMLElement
) {
  const virtualDomRoot: VirtualComponentReturnType = {
    type: realDomRoot.tagName.toLowerCase(),
    props: {
      id: realDomRoot.id,
      ...(Array.from(realDomRoot.attributes) as Attr[]).reduce(
        (acc, attr) => ({ ...acc, [attr.name]: attr.value }),
        {}
      ),
      children: [evaluate(virtualDom)],
    },
  };

  sync(virtualDomRoot, realDomRoot);
}
