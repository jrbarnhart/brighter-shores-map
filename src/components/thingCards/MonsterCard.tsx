import { Monster } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function MonsterCard({ monster }: { monster: Monster }) {
  return (
    <Card className="bg-sidebar border-sidebar-border text-sidebar-foreground">
      <CardHeader className="p-3">
        <CardTitle>
          {monster.name[0].toUpperCase() + monster.name.slice(1)}
        </CardTitle>
        <CardDescription>Location, Location</CardDescription>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        Attacks: , Immune: , Vulnerable:
      </CardContent>
    </Card>
  );
}
