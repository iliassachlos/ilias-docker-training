import type { FC } from "react";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import type { SavedPlanet } from "../../../types/planet";
import { useDeletePlanetMutation } from "../../../store/apis/saved-planet-api";

type PlanetCardProps = {
  planet: SavedPlanet;
  view?: "grid" | "list";
};

export const PlanetCard: FC<PlanetCardProps> = (props) => {
  const { planet, view = "grid" } = props;

  const [deletePlanet, { isLoading }] = useDeletePlanetMutation();

  const handleDelete = async () => {
    try {
      await deletePlanet(planet.id).unwrap();
      
      toast.success(`${planet.name} deleted`);
    } catch {
      toast.error(`Failed to delete ${planet.name}`);
    }
  };

  if (view === "list") {
    return (
      <Card className="rounded-2xl">
        <CardContent className="flex items-center gap-4 py-3">
          <div className="flex-1 min-w-0">
            <p className="font-semibold truncate">{planet.name}</p>
            <p className="text-sm text-muted-foreground truncate">{planet.terrain}</p>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground shrink-0">
            {Number(planet.population).toLocaleString() }
          </div>

          <Badge variant="secondary" className="shrink-0">
            {planet.climate}
          </Badge>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleDelete}
            disabled={isLoading}
            aria-label={`Delete ${planet.name}`}
            className="shrink-0"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-2xl">
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle className="text-xl">{planet.name}</CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">{planet.terrain}</p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="secondary">{planet.climate}</Badge>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDelete}
            disabled={isLoading}
            aria-label={`Delete ${planet.name}`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
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
  );
};
