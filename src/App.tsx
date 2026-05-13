import type { FC } from "react";
import { Header } from "./components/header";
import { Router } from "./router/router";

export const App: FC = () => {
  return (
    <div>
      <Header />

      <div className="container mx-auto px-2">
        <Router />
      </div>
    </div>
  );
};
