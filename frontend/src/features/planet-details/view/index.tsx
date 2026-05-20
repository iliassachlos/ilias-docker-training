import type { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetPlanetQuery } from "../../../store/apis/planet-api";
import {
  ArrowLeft,
  Globe,
  Droplets,
  Wind,
  RotateCcw,
  Orbit,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "../../../components/ui/badge";
import { StatsCard } from "../components/stats-card";
import { paths } from "../../../routes/paths";
import type { Planet } from "../../../types/planet";

type StatCardConfig = {
  icon: LucideIcon;
  label: string;
  format: (planet: Planet) => string;
};

const planetStatsMap: StatCardConfig[] = [
  {
    icon: Users,
    label: "Population",
    format: (planet) =>
      isNaN(Number(planet.population)) ? "-" : Number(planet.population).toLocaleString(),
  },
  {
    icon: Globe,
    label: "Diameter",
    format: (planet) =>
      isNaN(Number(planet.diameter)) ? "-" : `${Number(planet.diameter).toLocaleString()} km`,
  },
  { icon: Wind, label: "Gravity", format: (planet) => planet.gravity || "-" },
  {
    icon: Droplets,
    label: "Surface Water",
    format: (planet) => (isNaN(Number(planet.surface_water)) ? "-" : `${planet.surface_water}%`),
  },
  {
    icon: RotateCcw,
    label: "Rotation Period",
    format: (planet) =>
      isNaN(Number(planet.rotation_period)) ? "-" : `${planet.rotation_period} hrs`,
  },
  {
    icon: Orbit,
    label: "Orbital Period",
    format: (planet) =>
      isNaN(Number(planet.orbital_period)) ? "-" : `${planet.orbital_period} days`,
  },
];

export const PlanetDetailsView: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: planet, isLoading, isError } = useGetPlanetQuery(id!, { skip: !id });
  const navigate = useNavigate();

  const renderHeader = () => (
    <header className="flex flex-col justify-center items-start self-stretch">
      <button
        type="button"
        className="bg-white shadow backdrop-blur-lg rounded-full cursor-pointer p-2"
        onClick={() => navigate(paths.home)}
      >
        <ArrowLeft className="w-6 h-6" />
      </button>
    </header>
  );

  return (
    <main className="flex flex-col gap-8">
      {renderHeader()}

      {isLoading && <p className="text-muted-foreground">Loading...</p>}

      {isError && (
        <h2 className="text-destructive text-lg font-semibold">Failed to load planet details.</h2>
      )}

      {planet && (
        <>
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <h1 className="text-4xl font-bold tracking-tight">{planet.name}</h1>
              <Badge variant="secondary" className="text-sm px-3 py-1 rounded-full">
                {planet.climate}
              </Badge>
            </div>
            <p className="text-muted-foreground">{planet.terrain}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {planetStatsMap.map((stat) => (
              <StatsCard
                key={stat.label}
                label={stat.label}
                icon={stat.icon}
                value={stat.format(planet)}
              />
            ))}
          </div>
        </>
      )}
    </main>
  );
};
