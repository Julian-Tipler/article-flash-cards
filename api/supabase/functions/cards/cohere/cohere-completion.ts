import { Cohere } from "https://esm.sh/cohere-ai@7.9.3";
import { cohere } from "../../_shared/clients/cohere-client.ts";

export const cohereCompletion = async ({ prompt }: { prompt: string }) => {
  const completion = await cohere.chat({
    tools: [{
      name: "flashcards",
      description: "Create 10 flashcards from text",
      parameterDefinitions: {
        "front": {
          description: "Front of flashcard",
          type: "string",
          required: true,
        },
        "back": {
          description: "Back of flashcard",
          type: "string",
          required: true,
        },
      },
    }],
    message: prompt,
    promptTruncation: Cohere.ChatRequestPromptTruncation.Off,
    temperature: 0.3,
  });
  if (!completion.toolCalls) {
    throw new Error("Failed to generate completion");
  }
  {
    return completion;
  }
};
