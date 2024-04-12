import { createCards } from "./create-cards";

export const displayButton = () => {
  const body = document.querySelector("body");
  // display a button just above the body of the page
  const button = document.createElement("button");
  button.innerHTML = "Create Flashcards";
  button.style.position = "fixed";
  button.style.bottom = "0";
  button.style.right = "0";
  button.style.zIndex = "9999";
  button.style.backgroundColor = "red";
  button.style.color = "white";
  button.style.padding = "10px";
  button.style.border = "none";
  button.style.cursor = "pointer";
  button.style.borderRadius = "5px";
  button.style.margin = "10px";
  button.style.fontSize = "16px";
  button.style.fontWeight = "bold";

  button.addEventListener("click", async () => {
    button.innerHTML = "Creating Flashcards...";
    const success = await createCards();
    if (success) {
      button.innerHTML = "Flashcards Created!";
    } else {
      button.innerHTML = "Failed to create Flashcards!";
    }
  });

  body.appendChild(button);
};
