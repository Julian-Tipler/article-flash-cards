import { CohereClient } from "https://esm.sh/cohere-ai@7.9.3";

export const cohere = new CohereClient({
  token: Deno.env.get("COHERE_API_KEY") as string,
});
