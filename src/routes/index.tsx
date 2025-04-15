import { createBrowserRouter, Navigate } from "react-router-dom";
import { Account } from "../pages/Account";
import { Home } from "../pages/Home";
import { App } from "../App";
import { CreateList } from "../pages/CreateList";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/account" replace />,
  },
  {
    path: "/account",
    element: <Account />,
  },
  {
    path: "/app",
    element: <App />,
    children: [
      {
        path: "list",
        element: <Home />,
      },
      {
        path: "list/add",
        element: <CreateList />,
      }
    ]
  }
])
