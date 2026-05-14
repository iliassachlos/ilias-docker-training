import type { FC } from "react";
import { Card, CardContent } from "../../../components/ui/card";
import type { LucideIcon } from "lucide-react";

type StatsCardProps = {
  icon: LucideIcon;
  label: string;
  value: string;
};

export const StatsCard: FC<StatsCardProps> = ({ icon: Icon, label, value }) => (
  <Card className="rounded-2xl">
    <CardContent className="p-5 flex flex-col gap-3">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="h-4 w-4" />
        <span className="text-xs font-medium uppercase tracking-wide">{label}</span>
      </div>
      <p className="text-2xl font-semibold">{value}</p>
    </CardContent>
  </Card>
);
