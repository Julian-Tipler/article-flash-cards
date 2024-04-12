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
  Also come up with a title for this set of flashcards.`;

  const completion = await cohereCompletion({ prompt });

  const { cards, cardSetTitle } = parseCompletion({ completion });

  const { id: cardSetId } = await createCardSet({ userId, cardSetTitle });

  const id = createCards({ userId, cards, cardSetId });

  const response = {
    Status: "Success",
    id,
  };
  try {
    return new CORSResponse(JSON.stringify(response));
  } catch (error) {
    console.error(error);
    return error.message;
  }
};

export const postCards = validate(handler, schema);
