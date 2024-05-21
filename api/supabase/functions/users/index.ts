import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { RequestMethod } from "../_shared/types/request-types.ts";
import { CORSResponse } from "../_shared/utils/cors.ts";
import { postPreferences } from "./post/index.ts";

serve(async (req: Request) => {
  const { method } = req;
  const url = new URL(req.url);
  const subRoute = url.pathname.split("/").pop();
  switch (method) {
    case RequestMethod.PUT:
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
