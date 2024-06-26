import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { RequestMethod } from "../_shared/types/request-types.ts";
import { CORSResponse } from "../_shared/utils/cors.ts";
import { postPreferences } from "./put/index.ts";
import { getPreferences } from "./get/index.ts";

serve(async (req: Request) => {
  const { method } = req;
  const url = new URL(req.url);
  const subRoute = url.pathname.split("/").pop();
  switch (method) {
    // TODO should figure out why PUT isn't working
    case RequestMethod.GET:
      return await getPreferences(req);
    case RequestMethod.POST:
      if (subRoute === "preferences") {
        return await postPreferences(req);
      } else {
        return new CORSResponse(null, { status: 404 });
      }
    case RequestMethod.OPTIONS:
      return new CORSResponse("ok");
    default:
      return new CORSResponse(null, { status: 404 });
  }
});
