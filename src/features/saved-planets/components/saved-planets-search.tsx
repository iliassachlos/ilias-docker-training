import type { FC } from "react";
import { Input } from "../../../components/ui/input";

type SavedPlanetsSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export const SavedPlanetsSearch: FC<SavedPlanetsSearchProps> = (props) => {
  const { value, onChange } = props;

  return (
    <div className="flex flex-row justify-start items-center self-stretch sm:w-full md:w-109.5">
      <Input
        type="search"
        placeholder="Search for a planet"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
