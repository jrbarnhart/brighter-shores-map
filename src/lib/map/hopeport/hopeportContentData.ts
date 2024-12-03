import { BankType, NPC } from "@/lib/types";
import { HopeportRoomId } from "./hopeportRoomData";
import { HopeportMonsterName } from "./roomContents/hopeportMonsterData";

export type HopeportRoomContentData = {
  roomId: HopeportRoomId;
  obelisk?: boolean;
  storageRift?: boolean;
  portalStone?: boolean;
  // Add Resources later
  monsters?: HopeportMonsterName[];
  npcs?: NPC[];
  banks?: BankType[];
};

const hopeportContentData = [
  { roomId: "sparring-area", monsters: ["guard"] },
  { roomId: "town-gates", monsters: ["deathcrow"] },
  { roomId: "old-street-east", monsters: ["deathcrow"] },
  { roomId: "tims-alley", monsters: ["thief"] },
  { roomId: "limpet-lane", monsters: ["thief"] },
  { roomId: "north-walls", monsters: ["goblin solider"] },
  { roomId: "south-walls", monsters: ["goblin chief"] },
  { roomId: "overgrown-road", monsters: ["hairbeast"] },
  { roomId: "rubble-road", monsters: ["hairbeast"] },
  { roomId: "overgrown-field", monsters: ["carnivorous plant"] },
  { roomId: "fallen-monument", monsters: ["carnivorous plant"] },
  { roomId: "collapsed-hovels", monsters: ["ghoul"] },
  { roomId: "wasteland", monsters: ["ghoul"] },
  { roomId: "wilhope-passage", monsters: ["street louse"] },
  { roomId: "murk-close", monsters: ["thug"] },
  { roomId: "east-beach", monsters: ["crab"] },
  { roomId: "overgrown-pond", monsters: ["bugman"] },
  { roomId: "jellyfish-landing", monsters: ["jellyfish"] },
  { roomId: "crater", monsters: ["giant ant"] },
  { roomId: "pirate-hideout", monsters: ["pirate"] },
  { roomId: "rocky-road", monsters: ["punkupine"] },
] as const satisfies readonly HopeportRoomContentData[];

export default hopeportContentData;
