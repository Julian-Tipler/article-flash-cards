import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { RequestMethod } from "../_shared/types/request-types.ts";
import { postCards } from "./post/index.ts";
import { CORSResponse } from "../_shared/utils/cors.ts";
import { getSet } from "./get/index.ts";
import { getSets } from "./index/index.ts";

serve(async (req: Request) => {
  const { method } = req;
  switch (method) {
    case RequestMethod.POST:
      return await postCards(req);
    case RequestMethod.GET: {
      // extract params from the req
      const url = new URL(req.url);
      const params = Object.fromEntries(url.searchParams.entries());
      if (params.setId) {
        return await getSet(req);
      } else {
        return await getSets(req);
      }
    }
    case RequestMethod.OPTIONS:
      return new CORSResponse("ok");
    default:
      return new CORSResponse(null, { status: 404 });
  }
});
