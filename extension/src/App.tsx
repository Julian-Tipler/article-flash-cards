import {
  RouterProvider,
  createHashRouter,
  Outlet,
  redirect,
} from "react-router-dom";
import { Login } from "./views/auth/Login";
import { Session } from "@supabase/supabase-js";
import { supabase } from "./clients/supabase";
import { Splash } from "./views/Splash";
// import { MainLayout } from "./MainLayout";
// import { Session } from "@supabase/supabase-js";
// import { supabase } from "./clients/supabase";

const App = () => {
  const router = createHashRouter([
    {
      id: "root",
      path: "/",
      element: (
        <div className="app">
          <Outlet />
        </div>
      ),
      children: [
        {
          path: "/",
          element: <Splash />,
          loader: protectedLoader,
        },
        {
          path: "/login",
          index: true,
          element: <Login />,
        },
        {
          path: "*",
          element: <div>Error</div>,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} fallbackElement={<></>} />;
};

export default App;

async function protectedLoader() {
  const sessionToken = await isAuthenticated();
  if (!sessionToken || !sessionToken.access_token) {
    return redirect("/login");
  }

  const auth = await supabase.auth.getUser(sessionToken.access_token);
  if (!auth.data?.user) {
    return redirect("/login");
  }
  return { sessionToken };
}

const isAuthenticated = async (): Promise<Session | false> => {
  return new Promise((resolve) => {
    chrome.storage.local.get(["wiseFlashcardsSessionToken"], function(result) {
      if (result.wiseFlashcardsSessionToken) {
        resolve(result.wiseFlashcardsSessionToken);
      } else {
        resolve(false);
      }
    });
  });
};
