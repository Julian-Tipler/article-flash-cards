import { displayButton } from "./helpers/display-button";
import "./index.css";

console.log("content.js 🚀🚀");

window.addEventListener("load", () => {
  console.log("content.js loaded");
  init();
});

function init() {
  displayButton();
}
