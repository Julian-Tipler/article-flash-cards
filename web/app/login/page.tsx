// "use client";
import { useEffect } from "react";
// import { GoogleLoginButton } from "./GoogleLoginButton";

// export default function LoginPage() {
//   return (
//     <main className="flex items-center justify-center md:h-screen">
//       <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
//         <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
//           <GoogleLoginButton />
//         </div>
//       </div>
//     </main>
//   );
// }

import { GoogleLoginButton } from "./GoogleLoginButton";
import { login } from "./actions";
import { supabase } from "../shared/clients/supabase/supabase-client";
// import { login, signup } from "./actions";

export default function LoginPage() {
  // useEffect(() => {
  //   const fetchAuth = async () => {
  //     const { data } = await supabase.auth.signInWithOAuth({
  //       provider: "google",
  //       options: {
  //         queryParams: {
  //           access_type: "offline",
  //           prompt: "consent",
  //         },
  //         //   redirectTo: "http://localhost:55321/auth/v1/callback",
  //       },
  //     });
  //   };
  //   fetchAuth();
  // });

  return (
    <form>
      <button formAction={login}>Log in</button>
      {/* <button formAction={signup}>Sign up</button> */}
    </form>
  );
}
