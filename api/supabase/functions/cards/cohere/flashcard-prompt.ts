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
  First return a title in this format:
  title: "<title of the article>"
  Then put the flashcards in a list with stars (*) before each card:
  * front: "<front of the card text>", back: "<back of the card text>"
  * front: "<second front of card>", back: "<second back of the card text>"
  Make ${quantity} flashcards from this article: \n\n${content}`;
};
