import { createBrowserRouter, Navigate } from "react-router-dom";
import { paths } from "./paths";
import { mainRoutes } from "./main";
import { errorRoutes } from "./error";

export const routes = [
  ...mainRoutes,
  ...errorRoutes,
  { path: "*", element: <Navigate to={paths.notFound} replace /> },
];

const router = createBrowserRouter(routes);

export default router;
