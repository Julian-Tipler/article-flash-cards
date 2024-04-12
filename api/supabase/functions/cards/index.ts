import { RequestMethod } from "../_shared/types/request-types.ts";
import { postCards } from "./post/index.ts";

Deno.serve(async (req) => {
  const { method } = req;
  switch (method) {
    case RequestMethod.POST:
      return await postCards(req);
  }
  const data = {
    message: `Hello ${name}!`,
  };

  return new Response(
    JSON.stringify(data),
    { headers: { "Content-Type": "application/json" } },
  );
});
