import { createCards } from "../api/create-cards";

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
