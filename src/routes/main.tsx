/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
import { paths } from "./paths";
import { Layout } from "../components/layout/layout";

export const Homepage = lazy(() => import("../pages/homepage"));
export const PlanetDetailsPage = lazy(() => import("../pages/planet-details"));

export const mainRoutes = [
  {
    path: paths.home,
    element: (
      <Layout>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </Layout>
    ),
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: paths.planetDetails(":id"),
        element: <PlanetDetailsPage />,
      },
    ],
  },
];
