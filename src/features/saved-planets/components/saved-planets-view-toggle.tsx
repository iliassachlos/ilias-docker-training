import { type FC } from "react";
import { ToggleGroup, ToggleGroupItem } from "../../../components/ui/toggle-group";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import { setPlanetView, type ViewOption } from "../../../store/slices/ui-slice";

const VIEW_OPTIONS = ["grid", "list"] as const;

export const PlanetViewToggle: FC = () => {
  const view = useSelector((state: RootState) => state.ui.planetView);

  const dispatch = useDispatch();

  return (
    <ToggleGroup
      variant="outline"
      type="single"
      value={view}
      onValueChange={(value) => dispatch(setPlanetView(value as ViewOption))}
    >
      {VIEW_OPTIONS.map((option) => (
        <ToggleGroupItem
          className="cursor-pointer"
          key={option}
          value={option}
          aria-label={`Toggle ${option}`}
        >
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};
