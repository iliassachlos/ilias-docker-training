import type { FC } from "react";
import { Helmet } from "react-helmet-async";
import { PlanetDetailsView } from "../../features/planet-details/view";

const PlanetDetailsPage: FC = () => {
  return (
    <>
      <Helmet>
        <title>Planet Details | Docker Training</title>
        <meta name="description" content="View planet details" />
      </Helmet>

      <PlanetDetailsView />
    </>
  );
};

export default PlanetDetailsPage;
