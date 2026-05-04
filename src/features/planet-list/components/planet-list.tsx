import { type FC } from "react";
import type { SavedPlanet } from "../../../types/planet";
import { PlanetCard } from "./planet-card";
import { PlanetCardSkeleton } from "./planet-card-skeleton";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";

type PlanetListProps = {
  planets?: SavedPlanet[];
  isLoading: boolean;
  error: unknown;
};

const SKELETON_COUNT = 6;

export const PlanetList: FC<PlanetListProps> = (props) => {
  const { planets, isLoading, error } = props;

  const view = useSelector((state: RootState) => state.ui.planetView);

  console.log("view", view);

  if (isLoading) {
    return (
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
          <li key={index}>
            <PlanetCardSkeleton />
          </li>
        ))}
      </ul>
    );
  }

  if (error) {
    return <p>Failed to load planets.</p>;
  }

  if (!planets || planets.length === 0) {
    return <p>No planets found.</p>;
  }

  return (
    <>
      {view === "grid" ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {planets.map((planet, index) => (
            <li key={`${planet.id}-${index}`} className="rounded-2xl border p-4">
              <PlanetCard planet={planet} />
            </li>
          ))}
        </ul>
      ) : (
        <ul className="flex flex-col gap-2">
          {planets.map((planet, index) => (
            <li key={`${planet.id}-${index}`}>
              <PlanetCard planet={planet} view="list" />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
