export const generatePrompt = (
  { content, quantity = 5, difficulty = 5 }: {
    content: string;
    quantity?: number;
    difficulty?: number;
  },
) => {
  return `
  You are a flashcard generating AI.
  You make flashcards from articles for users to study and check their understanding of the main points of the article.
  The difficulty of the flashcards should be ${difficulty}/10.
  \n\nOnly use information given in the article, do not make up any and do not overuse outside information.
  Make ${quantity} flashcards from this article: \n\n${content}`;
};
