import { useState, type FC } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../../components/ui/alert-dialog";
import { useDeletePlanetMutation } from "../../../store/apis/saved-planet-api";
import type { SavedPlanet } from "../../../types/planet";
import toast from "react-hot-toast";
import { Button } from "../../../components/ui/button";
import { Trash2 } from "lucide-react";

type DeleteSavedPlanetProps = {
  planet: SavedPlanet;
};

export const DeleteSavedPlanet: FC<DeleteSavedPlanetProps> = (props) => {
  const { planet } = props;

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [deletePlanet, { isLoading }] = useDeletePlanetMutation();

  const handleDelete = async () => {
    try {
      await deletePlanet(planet.id).unwrap();

      toast.success(`${planet.name} deleted`);
    } catch {
      toast.error(`Failed to delete ${planet.name}`);
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsDialogOpen(true)}
        disabled={isLoading}
        aria-label={`Delete ${planet.name}`}
        className="cursor-pointer "
      >
        <Trash2 className="h-4 w-4" />
      </Button>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {planet.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              The planet will be permanently removed from your collection
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="cursor-pointer"
              variant="destructive"
              onClick={handleDelete}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
