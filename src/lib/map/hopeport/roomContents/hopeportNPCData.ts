import { NPCData } from "@/lib/types";

const HOPEPORT_NPC_DATA = [
  { name: "Captain Degreene", types: ["quest"] },
] as const satisfies readonly NPCData[];

export type HopeportNPCName = (typeof HOPEPORT_NPC_DATA)[number]["name"];

export default HOPEPORT_NPC_DATA;
