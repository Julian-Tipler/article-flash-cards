import { Cohere } from "https://esm.sh/cohere-ai@7.9.3";

export const parseCompletion = (
  { toolCalls }: {
    toolCalls: Cohere.ToolCall[];
  },
) => {
  const cards = toolCalls.map((toolCall) => {
    const { front, back } = toolCall.parameters;
    return { front, back };
  });
  return {
    cards,
  };
};
