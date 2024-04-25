import { CompleteRequest } from "../../_shared/types/request-types.ts";
import { CORSResponse } from "../../_shared/utils/cors.ts";
import { validate } from "../../_shared/utils/validate.ts";
import { object, ObjectSchema, string } from "https://esm.sh/yup@1.2.0";
import { readSets } from "../database/read-sets.ts";
import { authenticateUser } from "../../_shared/utils/authenticateUser.ts";

type Req = Record<string | number | symbol, unknown>;
const schema: ObjectSchema<Req> = object();

const handler = async (req: CompleteRequest): Promise<Response> => {
  try {
    const user = await authenticateUser(req);
    const cards = await readSets({ userId: user.id });

    const response = {
      cards,
    };
    return new CORSResponse(JSON.stringify(response));
  } catch (error) {
    console.error(error);
    return error.message;
  }
};

export const getSets = validate(handler, schema);
