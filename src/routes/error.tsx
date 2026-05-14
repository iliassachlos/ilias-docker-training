/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from "react";
import { paths } from "./paths";
import { Layout } from "../components/layout/layout";
import { Outlet } from "react-router-dom";

export const NotFoundPage = lazy(() => import("../pages/404"));

export const errorRoutes = [
  {
    paths: paths.home,
    element: (
      <Layout>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </Layout>
    ),
    children: [
      {
        path: paths.notFound,
        element: <NotFoundPage />,
      },
    ],
  },
];
