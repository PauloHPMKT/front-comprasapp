import { createBrowserRouter } from "react-router-dom";
import { Account } from "../pages/Account";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Account />,
  }
])
