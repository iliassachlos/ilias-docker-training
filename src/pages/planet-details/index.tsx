import type { FC } from "react";
import { Helmet } from "react-helmet-async";

const PlanetDetailsPage: FC = () => {
  return (
    <>
      <Helmet>
        <title>Planet Details | Docker Training</title>
        <meta name="description" content="View planet details" />
      </Helmet>
    </>
  );
};

export default PlanetDetailsPage;
