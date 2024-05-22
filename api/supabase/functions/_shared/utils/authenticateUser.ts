import { supabase } from "../clients/supabase.ts";
import { CompleteRequest } from "../types/request-types.ts";

export async function authenticateUser(request: CompleteRequest) {
  const token = request.header.Authorization?.split(" ")[1];

  if (!token) {
    console.error("Authorization token not provided");
    throw new Error("Authorization token not provided");
  }

  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  if (!user || !user.id) {
    console.error("User not found");
    throw new Error("User not found");
  }

  return user;
}
