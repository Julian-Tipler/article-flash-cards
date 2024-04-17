type Card = {
  front: string;
  back: string;
};

type Set = {
  title: string;
  cards: Card[];
};

export function parseFlashCards({ text }: { text: string }): Set {
  const titleRegex = /title:\s*"([^"]+)"/;
  const titleMatch = text.match(titleRegex);
  if (!titleMatch) {
    throw new Error("No title found in the text.");
  }
  const title = titleMatch[1];

  // Update regex to accommodate the comma between 'front' and 'back'
  const cardRegex = /\*\s*front:\s*"([^"]+)",\s*back:\s*"([^"]+)"/g;
  let match;
  const cards: Card[] = [];

  // Loop over all matches of the card pattern
  while ((match = cardRegex.exec(text)) !== null) {
    const front = match[1];
    const back = match[2];
    cards.push({ front, back });
  }

  return { title, cards };
}
