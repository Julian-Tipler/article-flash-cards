import { createClient } from "../shared/clients/supabase/supabase-server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default function LoginPage() {
  const signIn = async () => {
    "use server";
    const supabase = createClient();
    const origin = headers().get("origin");
    const { error, data } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });
    if (error) {
      console.log("error", error);
    } else {
      return redirect(data.url);
    }
  };

  return (
    <form
      action={signIn}
      className="flex-1 flex min-h-screen justify-center items-center"
    >
      <button>Log in With Google</button>
    </form>
  );
}
