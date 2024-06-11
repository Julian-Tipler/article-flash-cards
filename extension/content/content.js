import { displayCollapsedIconAndButton } from "./components/display-button";
import "./index.css";

console.log("content.js 🚀🚀🚀");

window.addEventListener("load", () => {
  init();
});

async function  init() {
  await displayCollapsedIconAndButton();
}
