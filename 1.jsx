const TEXT_ELEMENT = "TEXT_ELEMENT";
const OBJECT = "object";

const createElement = (type, props, ...children) => ({
  type,
  props: {
    ...props,
    children: children.map(child =>
      typeof child === OBJECT ? child : createTextElement(child)
    ),
  }
});

const createTextElement = (text) => ({
  type: TEXT_ELEMENT,
  props: {
    nodeValue: text,
    children: [],
  }
});

function render(element, container) {
  const dom = element.type == TEXT_ELEMENT
    ? document.createTextNode("")
    : document.createElement(element.type);

  Object
    .keys(element.props)
    .filter(key => key !== "children")
    .forEach(name => {
      dom[name] = element.props[name];
    });

  element.props.children.forEach(child => render(child, dom));
  container.appendChild(dom);
  console.log(dom);
};

const Neact = {
  createElement,
  render,
}

/** @jsx Neact.createElement */
const element = (
  <div id="foo">
    <h1>Neact</h1>
    <h2 style="text-align:center">from Neact</h2>
  </div>
);
const container = document.getElementById("root");
Neact.render(element, container);

console.log("Loaded 1.jsx");