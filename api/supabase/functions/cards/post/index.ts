import { CompleteRequest } from "../../_shared/types/request-types.ts";
import { CORSResponse } from "../../_shared/utils/cors.ts";
import { validate } from "../../_shared/utils/validate.ts";
import { object, ObjectSchema, string } from "https://esm.sh/yup@1.2.0";
import { cohereCompletion } from "../cohere/cohere-completion.ts";
import { parseCompletion } from "../helpers/parse-completion.ts";
import { createCardSet } from "../database/create-card-set.ts";
import { createCards } from "../database/create-cards.ts";
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
  const { userId } = req.params;
  const { content } = await req.body;

  const prompt = `Make 5 flashcards from this content: ${content}
  \n\nOnly use information given in the content, do not make up any`;

  const { toolCalls } = await cohereCompletion({ prompt });

  if (!toolCalls) {
    throw new Error("Failed to generate completion");
  }

  const { cards } = parseCompletion({ toolCalls });

  const { cardSetId } = await createCardSet({ userId });

  await createCards({ cards, cardSetId });

  const response = {
    Status: "Success",
    cardSetId,
  };
  try {
    return new CORSResponse(JSON.stringify(response));
  } catch (error) {
    console.error(error);
    return error.message;
  }
};

export const postCards = validate(handler, schema);
