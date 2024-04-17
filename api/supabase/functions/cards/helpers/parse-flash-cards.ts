type FlashCard = {
  front: string;
  back: string;
};

type FlashCardSet = {
  title: string;
  cards: FlashCard[];
};

export function parseFlashcards({ text }: { text: string }): FlashCardSet {
  // Extract title using regex
  const titleMatch = text.match(/title:\s*"([^"]+)"/);
  if (!titleMatch) {
    throw new Error("Title not found in the text.");
  }
  const title = titleMatch[1];

  // Extract cards
  const cardRegex = /\d+\.\s*front:\s*"([^"]+)"\s*back:\s*"([^"]+)"/g;
  let match;
  const cards: FlashCard[] = [];

  while ((match = cardRegex.exec(text)) !== null) {
    const front = match[1];
    const back = match[2];
    cards.push({ front, back });
  }
  console.log("CARDS", cards);
  return { title, cards };
}
 