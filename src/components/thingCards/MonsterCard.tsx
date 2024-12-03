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
    <Card>
      <CardHeader>
        <CardTitle>{monster.name}</CardTitle>
      </CardHeader>
      <CardDescription>Location, Location</CardDescription>
      <CardContent>Attacks: , Immune: , Vulnerable:</CardContent>
    </Card>
  );
}
