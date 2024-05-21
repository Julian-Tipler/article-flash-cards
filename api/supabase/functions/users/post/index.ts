import { CompleteRequest } from "../../_shared/types/request-types.ts";
import { CORSResponse } from "../../_shared/utils/cors.ts";
import { validate } from "../../_shared/utils/validate.ts";
import { object, ObjectSchema, string } from "https://esm.sh/yup@1.2.0";
import { authenticateUser } from "../../_shared/utils/authenticateUser.ts";
import { updateUserPreferences } from "../../cards/database/update-user-preferences.ts";

interface Req {
  body: {
    defaultDifficulty?: string;
    defaultQuantity?: string;
  };
}

const schema: ObjectSchema<Req> = object({
  body: object({
    defaultDifficulty: string(),
    defaultQuantity: string(),
  }),
});

const handler = async (req: CompleteRequest): Promise<Response> => {
  try {
    const user = await authenticateUser(req);
    
    const { defaultDifficulty, defaultQuantity } = await req.body;
    if (!defaultDifficulty || !defaultQuantity) {
      throw new Error("Missing required fields");
    }

    await updateUserPreferences({
      userId: user.id,
      defaultDifficulty,
      defaultQuantity,
    });

    const response = { ok: true };
    return new CORSResponse(JSON.stringify(response));
  } catch (error) {
    console.error(error);
    return error.message;
  }
};

export const postPreferences = validate(handler, schema);
