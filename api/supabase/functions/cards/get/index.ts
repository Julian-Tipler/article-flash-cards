import { CompleteRequest } from "../../_shared/types/request-types.ts";
import { CORSResponse } from "../../_shared/utils/cors.ts";
import { validate } from "../../_shared/utils/validate.ts";
import { object, ObjectSchema, string } from "https://esm.sh/yup@1.2.0";
import { readSet } from "../database/read-set.ts";

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

    const { cards, cardSet } = await readSet({ cardSetId });
    const response = {
      cards,
      cardSet,
    };
    console.log("RESPONSE", response);
    return new CORSResponse(JSON.stringify(response));
  } catch (error) {
    console.error(error);
    return error.message;
  }
};

export const getSet = validate(handler, schema);
