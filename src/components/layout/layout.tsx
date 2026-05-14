import type { FC, ReactNode } from "react";
import { Header } from "./header";

export const Layout: FC<{ children: ReactNode }> = ({ children }) => (
  <div>
    <Header />
    <div className="container mx-auto p-4">{children}</div>
  </div>
);
