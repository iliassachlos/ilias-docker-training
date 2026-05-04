import type { FC } from "react";

export const Header: FC = () => {
  return (
    <header className="border-b bg-sky-50">
      <div className="container mx-auto flex py-4">
        <h1 className="text-lg font-semibold">Training App</h1>
      </div>
    </header>
  );
};
