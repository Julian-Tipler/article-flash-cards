import { createCards } from "../api/create-cards";
import { createIcon } from "./create-icon";



export const displayCollapsedIconAndButton = async () => {
  // Parents
  const sRoot = document.createElement("div");
  sRoot.id = "wise-flashcards-content-container";



  const shadowRoot = sRoot.attachShadow({mode: 'closed'});
  // shadowRoot.innerHTML  = `<style>:host {all: initial;}</style>`;

  const cssFiles = await Promise.all([
    loadCss('content/content.css'),
  ]);

  cssFiles.forEach(css => {
    const style = document.createElement('style');
    style.textContent = css;
    shadowRoot.appendChild(style);
  });

  // Icon
  const icon = document.createElement("button");
  icon.className = "wise-icon";
  icon.appendChild(createIcon());

  // Button
  const button = document.createElement("button");
  button.className = "wise-create-flashcards-button wise-button-hidden";
  button.innerHTML+= "Create Flashcards"
  button.appendChild(createIcon())
  
  // Event listeners
  button.addEventListener("click", handleCreateFlashCards(button));
  icon.addEventListener("click", () => {
    button.classList.remove("wise-button-hidden");
  });
  
  shadowRoot.appendChild(button)
  shadowRoot.appendChild(icon);
  document.body.appendChild(sRoot);
};

const handleCreateFlashCards = (button) => {
  return async () => {
    const sessionToken = await isAuthenticated();
    if (!sessionToken) {
      console.error("No session token found");
      window.open(`${import.meta.env.VITE_WEB_URL}/login`, "_blank");
      return;
    }
    try {
      button.innerHTML = "Creating Flashcards...";
      const articleText = extractArticleText();
      const { setId } = await createCards(articleText, sessionToken);
      if (!setId) {
        throw Error("No setId returned from API");
      }
      button.innerHTML = "Flashcards Created!";
      button.style.backgroundColor = "green";
      window.open(`${import.meta.env.VITE_WEB_URL}/sets/${setId}`, "_blank");
    } catch (error) {
      console.error("Error creating flashcards");
      button.innerHTML = "Error creating flashcards!";
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

const isAuthenticated = async () => {
  return new Promise((resolve) => {
    chrome.storage.local.get(["wiseFlashcardsSessionToken"], function(result) {
      if (result.wiseFlashcardsSessionToken) {
        resolve(result.wiseFlashcardsSessionToken);
      } else {
        resolve(false);
      }
    });
  });
};


async function loadCss(filePath) {
  const response = await fetch(chrome.runtime.getURL(filePath));
  return response.text();
}