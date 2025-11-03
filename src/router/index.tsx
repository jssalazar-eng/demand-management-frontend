import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "../components/layout";
import {
  Categories,
  Dashboard,
  DemandCreate,
  DemandDetail,
  DemandEdit,
  DemandList,
  Reports,
  Settings,
  Users,
} from "../pages";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "demands",
        element: <DemandList />,
      },
      {
        path: "demands/new",
        element: <DemandCreate />,
      },
      {
        path: "demands/:id/edit",
        element: <DemandEdit />,
      },
      {
        path: "demands/:id",
        element: <DemandDetail />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "reports",
        element: <Reports />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
