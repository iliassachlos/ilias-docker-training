import { useState, type FC } from "react";
import { Button } from "../../../components/ui/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../../../components/ui/combobox";
import { useSavePlanetMutation } from "../../../store/apis/saved-planet-api";
import { useGetPlanetsQuery } from "../../../store/apis/planet-api";
import { v4 as uuidv4 } from "uuid";
import type { SavedPlanet } from "../../../types/planet";
import { toast } from "react-hot-toast";

type AddPlanetViewProps = {
  savedPlanets?: SavedPlanet[];
};

export const AddPlanetView: FC<AddPlanetViewProps> = (props) => {
  const { savedPlanets } = props;

  const [selectedPlanet, setSelectedPlanet] = useState<string | null>("");

  const { data: planets, isLoading, error } = useGetPlanetsQuery();
  const [savePlanet, { isLoading: isSaving }] = useSavePlanetMutation();

  const planetNames = planets?.map((planet) => planet.name) || [];

  const handleSavePlanet = async () => {
    if (!selectedPlanet) return;

    if (savedPlanets?.some((planet) => planet.name === selectedPlanet)) {
      toast.error("Planet already saved");
      return;
    }

    const planet = planets?.find((planet) => planet.name === selectedPlanet);

    if (planet) {
      const planetToSave: SavedPlanet = { ...planet, id: uuidv4() };

      await savePlanet(planetToSave);
    }
  };

  return (
    <main className="flex flex-col sm:flex-row items-center self-stretch gap-2 w-full ">
      <Combobox items={planetNames} value={selectedPlanet} onValueChange={setSelectedPlanet}>
        <ComboboxInput
          placeholder="Select a planet"
          className="w-full md:w-87.5 px-2 border-2"
          disabled={isLoading}
        />
        <ComboboxContent>
          <ComboboxEmpty>{error ? "Error loading planets" : "No planets found"}</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>

      <Button
        className="w-full md:w-20"
        onClick={handleSavePlanet}
        disabled={!selectedPlanet || isSaving}
      >
        {isSaving ? "Saving..." : "Save"}
      </Button>
    </main>
  );
};
