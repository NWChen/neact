const TEXT_ELEMENT = "TEXT_ELEMENT";
const OBJECT = "object";

// Creates a Neact element
function createElement(type, props, ...children) {
  let materializedChildren = children.map(child => {
    if (typeof child === OBJECT)
      return child;

    // A text element provides its text content to `render` via `nodeValue`.
    return {
      type: TEXT_ELEMENT,
      props: {
        nodeValue: child,
        children: []
      }
    };
  });

  return {
    type,
    props: {
      ...props,
      children: materializedChildren
    }
  };
}

// Renders `element` to DOM as a child of the `container`
function render(element, container) {
  const dom = element.type == TEXT_ELEMENT
    ? document.createTextNode("")
    : document.createElement(element.type);
 
  // Process props from Neact properties to DOM properties
  Object
    .keys(element.props)
    .filter(key => key !== "children")
    .forEach(name => {
      dom[name] = element.props[name];
    });
 
  // Process children
  element.props.children.forEach(child => render(child, dom));
  container.appendChild(dom);
}

const Neact = {
  createElement,
  render,
}

/** @jsx Neact.createElement */
// for example:
// Neact.createElement(
//   "div",
//   { id: "foo" },
//   Neact.createElement("h1", null, "Neact"),
//   Neact.createElement("h2", { style: "text-align:center" }, "from Neact")
// );
const element = (
  <div id="foo">
    <h1>Neact</h1>
    <h2 style="text-align:center">from Neact</h2>
  </div>
);
const container = document.getElementById("root");
Neact.render(element, container);

console.log("Loaded 1.jsx");