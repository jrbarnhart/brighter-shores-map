import { ResourceNodeData } from "@/lib/types";

const HOPEPORT_RESOURCE_DATA = [
  {
    baseName: "Eel",
    type: "fisher",
    locations: ["eel-street-bridge"],
    variants: [{ variantName: "Lesser", unlockLevel: 2 }],
  },
] as const satisfies readonly ResourceNodeData[];

type HopeportResourceNodeEntries = typeof HOPEPORT_RESOURCE_DATA;

type HopeportResourceNodeVariantName<
  T extends HopeportResourceNodeEntries[number]
> = `${T["variants"][number]["variantName"]} ${T["baseName"]}`;

export type HopeportResourceNodeBaseName =
  (typeof HOPEPORT_RESOURCE_DATA)[number]["baseName"];

export type HopeportResourceNodeNameWithVariant =
  HopeportResourceNodeEntries[number] extends infer T
    ? T extends HopeportResourceNodeEntries[number]
      ? HopeportResourceNodeVariantName<T>
      : never
    : never;

export default HOPEPORT_RESOURCE_DATA;
