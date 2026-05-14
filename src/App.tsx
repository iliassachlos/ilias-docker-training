import type { FC } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { setupStore } from "./store/store";
import { RouterProvider } from "react-router-dom";
import router from "./routes";

export const App: FC = () => {
  const store = setupStore();

  return (
    <HelmetProvider>
      <Provider store={store}>
        <Toaster position="top-right" />
        <RouterProvider router={router} />
      </Provider>
    </HelmetProvider>
  );
};
