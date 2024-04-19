import {
  RouterProvider,
  createHashRouter,
  Outlet,
  // redirect,
} from "react-router-dom";
import { Login } from "./views/auth/Login";
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
          index: true,
          element: <Login />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} fallbackElement={<></>} />;
};

export default App;
