import { createCards } from "../helpers/create-cards";

export const displayButton = () => {
  const body = document.querySelector("body");
  // display a button just above the body of the page
  const button = document.createElement("button");
  button.innerHTML = "Create Flashcards";
  button.style.position = "fixed";
  button.style.bottom = "0";
  button.style.right = "0";
  button.style.zIndex = "9999";
  button.style.backgroundColor = "blue";
  button.style.color = "white";
  button.style.padding = "10px";
  button.style.border = "none";
  button.style.cursor = "pointer";
  button.style.borderRadius = "5px";
  button.style.margin = "10px";
  button.style.fontSize = "16px";
  button.style.fontWeight = "bold";

  button.addEventListener("click", handleCreateFlashCards(button));

  body.appendChild(button);
};

const handleCreateFlashCards = (button) => {
  return async () => {
    button.innerHTML = "Creating Flashcards...";

    const { cardSetId } = await createCards();
    if (cardSetId) {
      button.innerHTML = "Flashcards Created!";
      button.style.backgroundColor = "green";
      window.open(
        `${import.meta.env.VITE_WEB_URL}/cards/${cardSetId}`,
        "_blank"
      );
    } else {
      button.innerHTML = "Failed to create Flashcards!";
      button.style.backgroundColor = "red";
    }
    button.disabled = true;
  };
};