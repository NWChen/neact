const createElement = (type, props, ...children) => ({
  type,
  props: {
    ...props,
    children: children.map(child =>
      typeof child === "object" ? child : createTextElement(child)
    ),
  }
});

const createTextElement = (text) => ({
  text: "TEXT_ELEMENT",
  props: {
    nodeValue: text,
    children: [],
  }
});

const Neact = {
  createElement,
}

const element = Neact.createElement(
  "div",
  { id: "root"},
  Neact.createElement("a", null, "bar"),
  Neact.createElement("b",)
)
const container = document.getElementById("root");