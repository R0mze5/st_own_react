function createRealNodeFromVirtual(virtualNode: Node): Node | null {
  if (virtualNode.nodeType === Node.TEXT_NODE && virtualNode.nodeValue) {
    return document.createTextNode(virtualNode.nodeValue);
  }

  if (virtualNode instanceof HTMLElement) {
    return document.createElement(virtualNode.tagName);
  }

  return null;
}

function sync(virtualNode: Node, realNode: Node) {
  if (virtualNode instanceof HTMLElement
    && realNode instanceof HTMLElement) {
  // sync element
    if (virtualNode.id !== realNode.id) {
      realNode.id = virtualNode.id;
    }
    if (virtualNode.className !== realNode.className) {
      realNode.className = virtualNode.className;
    }

    if (virtualNode.attributes) {
      Array.from(virtualNode.attributes).forEach((attr: Attr) => {
        realNode.setAttribute(attr.name, attr.value);
      });
    }
  }

  // instead innerText
  if (virtualNode.nodeValue !== realNode.nodeValue) {
    realNode.nodeValue = virtualNode.nodeValue;
  }

  // sync child nodes

  const virtualChildren = virtualNode.childNodes;
  const realChildren = realNode.childNodes;
  for (let index = 0; index < virtualChildren.length || index < realChildren.length; index++) {
    const virtualChild: Node = virtualChildren[index];
    const realChild: Node = realChildren[index];
    // remove
    if (virtualChild === undefined && realChild !== undefined) {
      realNode.removeChild(realChild);
    }
    // update/replace

    if (virtualChild !== undefined && realChild !== undefined) {
      if (virtualChild instanceof HTMLElement
        && realChild instanceof HTMLElement
        && virtualChild.tagName === realChild.tagName) {
        sync(virtualChild, realChild);
      } else {
        const newRealChild = createRealNodeFromVirtual(virtualChild);

        if (newRealChild) {
          sync(virtualChild, newRealChild);

          realNode.replaceChild(newRealChild, realChild);
        }
      }
    }

    // add

    if (virtualChild !== undefined && realChild === undefined) {
      const newRealChild = createRealNodeFromVirtual(virtualChild);

      if (newRealChild) {
        sync(virtualChild, newRealChild);

        realNode.appendChild(newRealChild);
      }
    }
  }
}

export function render(virtualDom: HTMLElement, realDomRoot: HTMLElement) {
  const virtualDomRoot = document.createElement(realDomRoot.tagName);
  virtualDomRoot.id = realDomRoot.id;
  // realDomRoot.innerHTML = '';
  virtualDomRoot.append(virtualDom);

  sync(virtualDomRoot, realDomRoot);
}
