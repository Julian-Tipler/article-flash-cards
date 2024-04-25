import { supabase } from "../clients/supabase.ts";

export async function authenticateUser(request) {
  const token = request.header.Authorization?.split(" ")[1];

  if (!token) {
    throw new Error("Authorization token not provided");
  }

  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error) {
    throw new Error(error.message);
  }

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}
