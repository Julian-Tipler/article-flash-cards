import { CompleteRequest } from "../../_shared/types/request-types.ts";
import { CORSResponse } from "../../_shared/utils/cors.ts";
import { validate } from "../../_shared/utils/validate.ts";
import { object, ObjectSchema, string } from "https://esm.sh/yup@1.2.0";
import { authenticateUser } from "../../_shared/utils/authenticateUser.ts";
import { updateUserPreferences } from "../../cards/database/update-user-preferences.ts";
import { supabase } from "../../_shared/clients/supabase.ts";

interface Req {
}

const schema: ObjectSchema<Req> = object({});

const handler = async (req: CompleteRequest): Promise<Response> => {
  try {
    const user = await authenticateUser(req);

    const { data } = await supabase.from("users").select(
      "defaultDifficulty, defaultQuantity",
    ).eq("id", user.id).single();

    return new CORSResponse(JSON.stringify(data));
  } catch (error) {
    console.error(error);
    return error.message;
  }
};

export const getPreferences = validate(handler, schema);
