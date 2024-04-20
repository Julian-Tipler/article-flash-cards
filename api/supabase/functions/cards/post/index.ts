import { CompleteRequest } from "../../_shared/types/request-types.ts";
import { CORSResponse } from "../../_shared/utils/cors.ts";
import { validate } from "../../_shared/utils/validate.ts";
import { object, ObjectSchema, string } from "https://esm.sh/yup@1.2.0";
import { cohereCompletion } from "../cohere/cohere-completion.ts";
import { parseFlashCards } from "../helpers/parse-flash-cards.ts";
import { createSet } from "../database/create-set.ts";
import { createCards } from "../database/create-cards.ts";
import { generatePrompt } from "../cohere/flashcard-prompt.ts";
import jwt from "https://esm.sh/jsonwebtoken@9.0.2";

interface Req {
  body: {
    content: string;
  };
}

const schema: ObjectSchema<Req> = object({
  body: object({
    content: string().required(),
  }),
});

const handler = async (req: CompleteRequest): Promise<Response> => {
  try {
    const { content }: { content: string } = await req.body;
    const { Authorization } = req.header;
    const token = Authorization.split("Bearer ")[1];
    const payload = jwt.decode(token);
    if (!payload) {
      throw new Error("Failed to decode token");
    }
    const { sub } = payload;
    if (!sub || typeof sub !== "string") {
      throw new Error("Failed to grab sub from token");
    }

    const prompt = generatePrompt({ content });
    const { text } = await cohereCompletion({ prompt });

    if (!text) {
      throw new Error("Failed to generate completion");
    }

    const { cards, title } = parseFlashCards({ text });

    const { setId } = await createSet({ userId: sub, title });

    await createCards({ cards, setId });

    const response = {
      setId,
    };
    return new CORSResponse(JSON.stringify(response));
  } catch (error) {
    console.error(error);
    return error.message;
  }
};

export const postCards = validate(handler, schema);
