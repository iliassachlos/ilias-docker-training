import { useState, type FC } from "react";
import { AddPlanetView } from "../../add-planet/view";
import { PlanetViewToggle } from "../components/saved-planets-view-toggle";
import { useGetSavedPlanetsQuery } from "../../../store/apis/saved-planet-api";
import { PlanetList } from "../components/saved-planets-list";
import { SavedPlanetsSearch } from "../components/saved-planets-search";

export const SavedPlanetsView: FC = () => {
  const { data: savedPlanets, isLoading, error } = useGetSavedPlanetsQuery();

  const [searchValue, setSearchValue] = useState("");

  const filteredPlanets = savedPlanets?.filter((planet) =>
    planet.name.toLowerCase().includes(searchValue.toLowerCase()),
  );

  return (
    <main className="flex flex-col gap-6 my-4">
      <header className="flex flex-col justify-center items-start self-stretch">
        <h1 className="text-2xl font-semibold">Saved Planets</h1>
        {savedPlanets && savedPlanets.length > 0 && (
          <p>{savedPlanets.length} planets saved in your collection</p>
        )}
      </header>

      <div className="flex flex-row justify-start items-center self-stretch w-full">
        <AddPlanetView savedPlanets={savedPlanets} />
      </div>

      <div className="flex flex-col md:flex-row justify-center md:justify-between items-start md:items-center self-stretch my-2 gap-4">
        <SavedPlanetsSearch value={searchValue} onChange={setSearchValue} />
        <PlanetViewToggle />
      </div>

      <PlanetList
        planets={filteredPlanets}
        isLoading={isLoading}
        error={error}
        searchTerm={searchValue}
      />
    </main>
  );
};
