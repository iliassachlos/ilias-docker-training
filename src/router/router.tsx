import type { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { Homepage } from "../pages";

export const Router: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
    </Routes>
  );
};
