export const parseCompletion = (
  { completion }: { completion: string },
) => {
  return {
    cards: [{
      front: "Front of card",
      back: "Back of card",
    }, {
      front: "Front of card",
      back: "Back of card",
    }],
    cardSetTitle: "Title of card set",
  };
};
