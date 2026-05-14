import type { FC } from "react";
import { paths } from "../../routes/paths";
import { useNavigate } from "react-router-dom";

export const Header: FC = () => {
  const navigate = useNavigate();

  return (
    <header className="border-b bg-sky-50">
      <div className="container mx-auto flex px-2 py-4 ">
        <h1 className="text-lg font-semibold cursor-pointer" onClick={() => navigate(paths.home)}>
          Training App
        </h1>
      </div>
    </header>
  );
};
