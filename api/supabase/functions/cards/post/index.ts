import { CompleteRequest } from "../../_shared/types/request-types.ts";
import { CORSResponse } from "../../_shared/utils/cors.ts";
import { validate } from "../../_shared/utils/validate.ts";
import { object, ObjectSchema, string } from "https://esm.sh/yup@1.2.0";
import { cohereCompletion } from "../cohere/cohere-completion.ts";
import { parseFlashcards } from "../helpers/parse-flash-cards.ts";
import { createCardSet } from "../database/create-card-set.ts";
import { createCards } from "../database/create-cards.ts";
import { generatePrompt } from "../cohere/flashcard-prompt.ts";
interface Req {
  params: {
    userId: string;
  };
  body: {
    content: string;
  };
}

const schema: ObjectSchema<Req> = object({
  params: object({ userId: string().required() }),
  body: object({
    content: string().required(),
  }),
});

const handler = async (req: CompleteRequest): Promise<Response> => {
  try {
    const { userId }: { userId: string } = req.params;
    const { content }: { content: string } = await req.body;

    const prompt = generatePrompt({ content });
    const { text } = await cohereCompletion({ prompt });

    if (!text) {
      throw new Error("Failed to generate completion");
    }

    const { cards, title } = parseFlashcards({ text });

    const { cardSetId } = await createCardSet({ userId, title });

    await createCards({ cards, cardSetId });

    const response = {
      cardSetId,
    };
    return new CORSResponse(JSON.stringify(response));
  } catch (error) {
    console.error(error);
    return error.message;
  }
};

export const postCards = validate(handler, schema);
