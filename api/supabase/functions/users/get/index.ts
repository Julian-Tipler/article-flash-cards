import { CompleteRequest } from "../../_shared/types/request-types.ts";
import { CORSResponse } from "../../_shared/utils/cors.ts";
import { validate } from "../../_shared/utils/validate.ts";
import { object, ObjectSchema, string } from "https://esm.sh/yup@1.2.0";
import { authenticateUser } from "../../_shared/utils/authenticateUser.ts";
import { readUserPreferences } from "../../cards/database/read-user-preferences.ts";

interface Req {
}

const schema: ObjectSchema<Req> = object({});

const handler = async (req: CompleteRequest): Promise<Response> => {
  try {
    const user = await authenticateUser(req);

    const data = await readUserPreferences(user.id);

    return new CORSResponse(JSON.stringify(data));
  } catch (error) {
    console.error(error);
    return error.message;
  }
};

export const getPreferences = validate(handler, schema);
