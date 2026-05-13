import type { FC } from "react";
import { AddPlanetView } from "../../add-planet/view";
import { PlanetViewToggle } from "../components/saved-planets-view-toggle";
import { useGetSavedPlanetsQuery } from "../../../store/apis/saved-planet-api";
import { PlanetList } from "../components/saved-planets-list";

export const SavedPlanetsView: FC = () => {
  const { data: savedPlanets, isLoading, error } = useGetSavedPlanetsQuery();

  return (
    <main className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row justify-between items-center self-stretch my-2 gap-4">
        <AddPlanetView savedPlanets={savedPlanets} />
        <PlanetViewToggle />
      </div>

      <PlanetList planets={savedPlanets} isLoading={isLoading} error={error} />
    </main>
  );
};
