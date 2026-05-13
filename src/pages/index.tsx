import type { FC } from "react";

import { Helmet } from "react-helmet-async";
import { SavedPlanetsView } from "../features/saved-planets/view";

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
