import type { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import type { SavedPlanet } from "../../../types/planet";

import { DeleteSavedPlanet } from "./delete-saved-planet";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../routes/paths";
import toast from "react-hot-toast";

type PlanetCardProps = {
  planet: SavedPlanet;
  view?: "grid" | "list";
};

export const PlanetCard: FC<PlanetCardProps> = (props) => {
  const { planet, view = "grid" } = props;

  const navigate = useNavigate();

  const handleNavigate = () => {
    const swapiId = planet.url.split("/").filter(Boolean).pop();

    if (swapiId) {
      navigate(paths.planetDetails(swapiId));
    } else {
      toast.error("Invalid planet URL");
    }
  };

  if (view === "list") {
    return (
      <>
        <Card className="rounded-2xl cursor-pointer" onClick={handleNavigate}>
          <CardContent className="flex items-center gap-4 py-3">
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate">{planet.name}</p>
              <p className="text-sm text-muted-foreground truncate">{planet.terrain}</p>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground shrink-0">
              {Number(planet.population).toLocaleString()}
            </div>

            <Badge variant="secondary" className="shrink-0">
              {planet.climate}
            </Badge>

            <DeleteSavedPlanet planet={planet} />
          </CardContent>
        </Card>
      </>
    );
  }

  return (
    <>
      <Card className="rounded-2xl cursor-pointer" onClick={handleNavigate}>
        <CardHeader className="flex flex-row items-start justify-between space-y-0">
          <div>
            <CardTitle className="text-xl">{planet.name}</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">{planet.terrain}</p>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="secondary">{planet.climate}</Badge>
            <DeleteSavedPlanet planet={planet} />
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Population</span>
            <span className="font-medium">{Number(planet.population).toLocaleString()}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Terrain</span>
            <span className="font-medium">{planet.terrain}</span>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
