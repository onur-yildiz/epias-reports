export const createMenu = (array, depth = 1) => {
  let cursor;
  return array.reduce((menu, curr) => {
    let itemDepth = curr.order.length;

    if (!cursor) cursor = menu;
    else {
      const cursorOrder = `${cursor.order}`;
      const currOrder = `${curr.order}`;

      let length = currOrder.length - 1;
      if (currOrder.length > cursorOrder.length)
        length = cursorOrder.length;

      if (cursorOrder.substring(0, length).startsWith(currOrder.substring(0, length)) === false) {
        menu.children.push(curr);
        cursor = menu.children[menu.children.length - 1];
        depth = itemDepth;
        return menu;
      }
    }

    if (itemDepth > depth) {
      depth++;
      const children = cursor.children;
      if (children[children.length - 1] === undefined) children[children.length - 1] = {};
      children[children.length - 1].children = [];
      cursor = children[children.length - 1];
    } else if (itemDepth < depth) {
      depth = itemDepth;
      let parent = menu;
      for (let i = 1; i < depth; i++) {
        const children = parent.children;
        parent = children ? children[children.length - 1] : parent;
      }
      cursor = parent;
    }
    if (!cursor.children) cursor.children = [];
    cursor.children.push(curr);
    return menu
  }, {
    "name": "MAIN MENU",
    "order": "",
    "children": []
  })
}