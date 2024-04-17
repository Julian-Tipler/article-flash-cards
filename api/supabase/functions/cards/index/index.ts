import { CompleteRequest } from "../../_shared/types/request-types.ts";
import { CORSResponse } from "../../_shared/utils/cors.ts";
import { validate } from "../../_shared/utils/validate.ts";
import { object, ObjectSchema, string } from "https://esm.sh/yup@1.2.0";
import { readSets } from "../database/read-sets.ts";

interface Req {
}

const schema: ObjectSchema<Req> = object();

const handler = async (_req: CompleteRequest): Promise<Response> => {
  try {
    const cards = await readSets();

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
