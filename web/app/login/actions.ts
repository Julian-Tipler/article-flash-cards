"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "../shared/clients/supabase/supabase-server";

export async function login() {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs

  const { data } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    //   redirectTo: "http://localhost:55321/auth/v1/callback",
    },
  });
  console.log("DATA", data);
  if (data.url) {
    redirect(data.url);
  }

  //   if (error) {
  //     redirect("/error");
  //   }

  //   revalidatePath("/", "layout");
  //   redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}
