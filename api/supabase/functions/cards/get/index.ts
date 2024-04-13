import { CompleteRequest } from "../../_shared/types/request-types.ts";
import { CORSResponse } from "../../_shared/utils/cors.ts";
import { validate } from "../../_shared/utils/validate.ts";
import { object, ObjectSchema, string } from "https://esm.sh/yup@1.2.0";
import { readCards } from "../database/read-cards.ts";

interface Req {
  params: {
    cardSetId: string;
  };
}

const schema: ObjectSchema<Req> = object({
  params: object({ cardSetId: string().required() }),
});

const handler = async (req: CompleteRequest): Promise<Response> => {
  try {
    const { cardSetId } = req.params;

    const cards = await readCards({ cardSetId });

    const response = {
      cards,
    };
    return new CORSResponse(JSON.stringify(response));
  } catch (error) {
    console.error(error);
    return error.message;
  }
};

export const getCards = validate(handler, schema);
