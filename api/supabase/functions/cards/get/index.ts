import { CompleteRequest } from "../../_shared/types/request-types.ts";
import { CORSResponse } from "../../_shared/utils/cors.ts";
import { validate } from "../../_shared/utils/validate.ts";
import { object, ObjectSchema, string } from "https://esm.sh/yup@1.2.0";
import { readSet } from "../database/read-set.ts";
import { authenticateUser } from "../../_shared/utils/authenticateUser.ts";

interface Req {
  params: {
    setId: string;
  };
}

const schema: ObjectSchema<Req> = object({
  params: object({ setId: string().required() }),
});

const handler = async (req: CompleteRequest): Promise<Response> => {
  try {
    const user = await authenticateUser(req);
    const { setId } = req.params;

    const { cards, set } = await readSet({ setId, userId: user.id });
    const response = {
      cards,
      set,
    };
    return new CORSResponse(JSON.stringify(response));
  } catch (error) {
    console.error(error);
    return error.message;
  }
};

export const getSet = validate(handler, schema);
