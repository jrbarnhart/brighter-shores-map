import { RoomContentData } from "../mapData";
import { HopeportRoomId } from "./hopeportRoomData";

type HopeportContentData = RoomContentData & { roomId: HopeportRoomId };

export const HopeportMonsters = {
  guard: ["recruit", "rookie", "patrol", "wall", "veteran", "decorated"],
  deathcrow: [
    "glinteye",
    "beady-eyed",
    "wily",
    "slickwing",
    "shadowy",
    "vicious",
    "malevolent",
  ],
  thief: [
    "common",
    "scruffy",
    "back alley",
    "loitering",
    "shifty",
    "crafty",
    "sneaky",
    "dangerous",
  ],
  "goblin solider": [
    "looter",
    "hooligan",
    "plunderer",
    "raider",
    "marauder",
    "trooper",
    "warrior",
  ],
  "goblin chief": [
    "irritable",
    "bossy",
    "robust",
    "authoritative",
    "fierce",
    "preeminent",
  ],
  hairbeast: [
    "feral",
    "tangled",
    "lumbering",
    "shaggy",
    "hefty",
    "savage",
    "psychic",
  ],
  ghoul: ["shambling", "foraging", "pale", "crazed", "prowling", "frenzied"],
  "street louse": ["creepy", "blotchy", "black", "copper", "angry", "furious"],
  "carnivorous plant": [
    "snap",
    "leafjaw",
    "munching",
    "bladefang",
    "armsnapper",
    "bonecruncher",
  ],
  crab: [
    "pearlcap",
    "large",
    "blue scuttler",
    "bloodclaw",
    "granite shell",
    "boulder",
    "giant boulder",
    "enormous",
  ],
  bugman: [
    "primitive",
    "hungry",
    "scavenging",
    "ugly",
    "widejaw",
    "hunter",
    "terrifying",
  ],
  jellyfish: [
    "tiderider",
    "orange stinger",
    "yellow drifter",
    "man-o-combat",
    "fastvenom",
    "black",
    "doom",
  ],
  "giant ant": [
    "drone",
    "soldier",
    "amber stripe",
    "prowler",
    "nightwarrior",
    "goliath",
  ],
  pirate: [
    "grumpy",
    "ragged",
    "greedy",
    "cunning",
    "rugged",
    "treacherous",
    "nefarious",
    "swashbuckling",
  ],
  punkupine: [
    "shabby",
    "striped",
    "neon",
    "watchmen",
    "heavy",
    "orange tipped",
  ],
  thug: ["scruffy", "loutish", "rowdy", "angry", "tough", "elite"],
} as const;

export type HopeportMonsterType = keyof typeof HopeportMonsters;

export type HopeportMonsterName<T extends HopeportMonsterType> =
  `${(typeof HopeportMonsters)[T][number]} ${T}`;

const hopeportContentData = [
  { roomId: "captain-degreenes-office" },
] as const satisfies readonly HopeportContentData[];

export default hopeportContentData;
