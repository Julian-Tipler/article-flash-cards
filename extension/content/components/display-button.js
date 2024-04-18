import { createCards } from "../api/create-cards";

import "./button.css";

export const displayCollapsedIconAndButton = () => {
  // Display the icon
  const body = document.querySelector("body");
  const icon = document.createElement("button");
  icon.className = "wise-icon";
  icon.innerHTML = "***";
  body.appendChild(icon);

  // Display a button upon clicking the icon
  const button = document.createElement("button");
  button.className = "wise-create-flashcards-button wise-button-hidden";
  button.innerHTML = "Create Flashcards";

  button.addEventListener("click", handleCreateFlashCards(button));
  icon.addEventListener("click", () => {
    button.classList.remove("wise-button-hidden");
  });

  body.appendChild(button);
};

const handleCreateFlashCards = (button) => {
  return async () => {
    button.innerHTML = "Creating Flashcards...";

    const articleText = extractArticleText();
    const { setId } = await createCards(articleText);
    if (setId) {
      button.innerHTML = "Flashcards Created!";
      button.style.backgroundColor = "green";
      window.open(`${import.meta.env.VITE_WEB_URL}/sets/${setId}`, "_blank");
    } else {
      button.innerHTML = "Failed to create Flashcards!";
      button.style.backgroundColor = "red";
    }
    button.disabled = true;
  };
};

const extractArticleText = () => {
  // Common content selectors: These should be adjusted based on common patterns found in your target pages.
  const contentSelectors = [
    "article",
    ".post-content",
    ".article-content",
    ".post-body",
    ".entry-content",
    "main", // Some sites use main for their primary content
    'div[role="main"]', // A common attribute for main content areas
  ];

  // Find the first matching element for these selectors
  const content = contentSelectors.reduce((found, selector) => {
    return found || document.querySelector(selector);
  }, null);

  if (!content) {
    console.warn("No content found using common selectors, defaulting to body");
    return document.body.innerText.trim();
  }

  // Here, you might want to filter or process the text to remove unwanted parts like ads, navigation elements, etc.
  return cleanText(content.innerText);
};

// A basic example of a cleaning function that could be expanded based on specific needs
const cleanText = (text) => {
  return text
    .replace(/\s{2,}/g, " ") // Replace multiple whitespace with a single space
    .replace(/[\r\n]+/g, "\n") // Replace multiple line breaks with a single one
    .trim(); // Trim whitespace from start and end of text
};
