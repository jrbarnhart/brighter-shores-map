import { ResourceNodeData } from "@/lib/types";

const HOPEPORT_RESOURCE_DATA =
  [] as const satisfies readonly ResourceNodeData[];

export type HopeportResourceNodeName =
  (typeof HOPEPORT_RESOURCE_DATA)[number]["name"];

export default HOPEPORT_RESOURCE_DATA;
