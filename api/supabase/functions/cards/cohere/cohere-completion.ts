import { Cohere } from "https://esm.sh/cohere-ai@7.9.3";
import { cohere } from "../../_shared/clients/cohere-client.ts";

export const cohereCompletion = async ({ prompt }: { prompt: string }) => {
  const completion = await cohere.chat({
    message: prompt,
    promptTruncation: Cohere.ChatRequestPromptTruncation.Off,
    temperature: 0.3,
  });
  console.log("TEXT", completion.text)
  return {
    text: completion.text,
  };
};
