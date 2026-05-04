import type { FC } from "react";
import { AddPlanetView } from "../../add-planet/view";
import { PlanetViewToggle } from "../components/planet-view-toggle";
import { useGetSavedPlanetsQuery } from "../../../store/apis/saved-planet-api";
import { PlanetList } from "../components/planet-list";

export const PlanetListView: FC = () => {
  const { data: savedPlanets, isLoading, error } = useGetSavedPlanetsQuery();

  return (
    <main className="flex flex-col gap-8">
      <div className="flex flex-col md:flex-row justify-between items-center self-stretch gap-4">
        <AddPlanetView savedPlanets={savedPlanets} />
        <PlanetViewToggle />
      </div>

      <PlanetList planets={savedPlanets} isLoading={isLoading} error={error} />
    </main>
  );
};
