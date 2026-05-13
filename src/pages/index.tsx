import type { FC } from "react";
import { SavedPlanetsView } from "../features/planet-list/view";
import { Helmet } from "react-helmet-async";

export const Homepage: FC = () => {
  return (
    <>
      <Helmet>
        <title>Saved Planets | Docker Training</title>
        <meta name="description" content="Browse saved planets" />
      </Helmet>

      <SavedPlanetsView />
    </>
  );
};
