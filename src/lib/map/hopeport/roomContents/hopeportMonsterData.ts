import { MonsterData } from "@/lib/types";

const HOPEPORT_MONSTER_DATA = [
  {
    name: "guard",
    locations: ["sparring-area"],
    variants: [
      { name: "recruit", health: 0, experience: 0, skillLevel: 0 },
      { name: "rookie", health: 0, experience: 0, skillLevel: 0 },
      { name: "patrol", health: 0, experience: 0, skillLevel: 0 },
      { name: "wall", health: 0, experience: 0, skillLevel: 0 },
      { name: "veteran", health: 0, experience: 0, skillLevel: 0 },
      { name: "decorated", health: 0, experience: 0, skillLevel: 0 },
    ],
  },
  {
    name: "deathcrow",
    locations: ["town-gates", "old-street-east"],
    variants: [
      { name: "glinteye", health: 0, experience: 0, skillLevel: 0 },
      { name: "beady-eyed", health: 0, experience: 0, skillLevel: 0 },
      { name: "wily", health: 0, experience: 0, skillLevel: 0 },
      { name: "slickwing", health: 0, experience: 0, skillLevel: 0 },
      { name: "shadowy", health: 0, experience: 0, skillLevel: 0 },
      { name: "vicious", health: 0, experience: 0, skillLevel: 0 },
      { name: "malevolent", health: 0, experience: 0, skillLevel: 0 },
    ],
  },
  {
    name: "thief",
    locations: ["tims-alley", "limpet-lane"],
    variants: [
      { name: "common", health: 0, experience: 0, skillLevel: 0 },
      { name: "scruffy", health: 0, experience: 0, skillLevel: 0 },
      { name: "back alley", health: 0, experience: 0, skillLevel: 0 },
      { name: "loitering", health: 0, experience: 0, skillLevel: 0 },
      { name: "shifty", health: 0, experience: 0, skillLevel: 0 },
      { name: "crafty", health: 0, experience: 0, skillLevel: 0 },
      { name: "sneaky", health: 0, experience: 0, skillLevel: 0 },
      { name: "dangerous", health: 0, experience: 0, skillLevel: 0 },
    ],
  },
  {
    name: "goblin solider",
    locations: ["north-walls"],
    variants: [
      { name: "looter", health: 0, experience: 0, skillLevel: 0 },
      { name: "hooligan", health: 0, experience: 0, skillLevel: 0 },
      { name: "plunderer", health: 0, experience: 0, skillLevel: 0 },
      { name: "raider", health: 0, experience: 0, skillLevel: 0 },
      { name: "marauder", health: 0, experience: 0, skillLevel: 0 },
      { name: "trooper", health: 0, experience: 0, skillLevel: 0 },
      { name: "warrior", health: 0, experience: 0, skillLevel: 0 },
    ],
  },
  {
    name: "goblin chief",
    locations: ["south-walls"],
    variants: [
      { name: "irritable", health: 0, experience: 0, skillLevel: 0 },
      { name: "bossy", health: 0, experience: 0, skillLevel: 0 },
      { name: "robust", health: 0, experience: 0, skillLevel: 0 },
      { name: "authoritative", health: 0, experience: 0, skillLevel: 0 },
      { name: "fierce", health: 0, experience: 0, skillLevel: 0 },
      { name: "preeminent", health: 0, experience: 0, skillLevel: 0 },
    ],
  },
  {
    name: "hairbeast",
    locations: ["overgrown-road", "rubble-road"],
    variants: [
      { name: "feral", health: 0, experience: 0, skillLevel: 0 },
      { name: "tangled", health: 0, experience: 0, skillLevel: 0 },
      { name: "lumbering", health: 0, experience: 0, skillLevel: 0 },
      { name: "shaggy", health: 0, experience: 0, skillLevel: 0 },
      { name: "hefty", health: 0, experience: 0, skillLevel: 0 },
      { name: "savage", health: 0, experience: 0, skillLevel: 0 },
      { name: "psychic", health: 0, experience: 0, skillLevel: 0 },
    ],
  },
  {
    name: "ghoul",
    locations: ["collapsed-hovels", "wasteland"],
    variants: [
      { name: "shambling", health: 0, experience: 0, skillLevel: 0 },
      { name: "foraging", health: 0, experience: 0, skillLevel: 0 },
      { name: "pale", health: 0, experience: 0, skillLevel: 0 },
      { name: "crazed", health: 0, experience: 0, skillLevel: 0 },
      { name: "prowling", health: 0, experience: 0, skillLevel: 0 },
      { name: "frenzied", health: 0, experience: 0, skillLevel: 0 },
    ],
  },
  {
    name: "street louse",
    locations: ["wilhope-passage"],
    variants: [
      { name: "creepy", health: 0, experience: 0, skillLevel: 0 },
      { name: "blotchy", health: 0, experience: 0, skillLevel: 0 },
      { name: "black", health: 0, experience: 0, skillLevel: 0 },
      { name: "copper", health: 0, experience: 0, skillLevel: 0 },
      { name: "angry", health: 0, experience: 0, skillLevel: 0 },
      { name: "furious", health: 0, experience: 0, skillLevel: 0 },
    ],
  },
  {
    name: "thug",
    locations: ["murk-close"],
    variants: [
      { name: "back alley", health: 0, experience: 0, skillLevel: 0 },
      { name: "scruffy", health: 0, experience: 0, skillLevel: 0 },
      { name: "loutish", health: 0, experience: 0, skillLevel: 0 },
      { name: "rowdy", health: 0, experience: 0, skillLevel: 0 },
      { name: "angry", health: 0, experience: 0, skillLevel: 0 },
      { name: "tough", health: 0, experience: 0, skillLevel: 0 },
      { name: "elite", health: 0, experience: 0, skillLevel: 0 },
    ],
  },
  {
    name: "carnivorous plant",
    locations: ["overgrown-field", "fallen-monument"],
    variants: [
      { name: "snap", health: 0, experience: 0, skillLevel: 0 },
      { name: "leafjaw", health: 0, experience: 0, skillLevel: 0 },
      { name: "munching", health: 0, experience: 0, skillLevel: 0 },
      { name: "bladefang", health: 0, experience: 0, skillLevel: 0 },
      { name: "armsnapper", health: 0, experience: 0, skillLevel: 0 },
      { name: "bonecruncher", health: 0, experience: 0, skillLevel: 0 },
    ],
  },
  {
    name: "crab",
    locations: ["east-beach"],
    variants: [
      { name: "pearlcap", health: 0, experience: 0, skillLevel: 0 },
      { name: "large", health: 0, experience: 0, skillLevel: 0 },
      { name: "blue scuttler", health: 0, experience: 0, skillLevel: 0 },
      { name: "bloodclaw", health: 0, experience: 0, skillLevel: 0 },
      { name: "granite shell", health: 0, experience: 0, skillLevel: 0 },
      { name: "boulder", health: 0, experience: 0, skillLevel: 0 },
      { name: "giant boulder", health: 0, experience: 0, skillLevel: 0 },
      { name: "enormous", health: 0, experience: 0, skillLevel: 0 },
    ],
  },
  {
    name: "bugman",
    locations: ["overgrown-pond"],
    variants: [
      { name: "primitive", health: 0, experience: 0, skillLevel: 0 },
      { name: "hungry", health: 0, experience: 0, skillLevel: 0 },
      { name: "scavenging", health: 0, experience: 0, skillLevel: 0 },
      { name: "ugly", health: 0, experience: 0, skillLevel: 0 },
      { name: "widejaw", health: 0, experience: 0, skillLevel: 0 },
      { name: "hunter", health: 0, experience: 0, skillLevel: 0 },
      { name: "terrifying", health: 0, experience: 0, skillLevel: 0 },
    ],
  },
  {
    name: "jellyfish",
    locations: ["jellyfish-landing"],
    variants: [
      { name: "tiderider", health: 0, experience: 0, skillLevel: 0 },
      { name: "orange stinger", health: 0, experience: 0, skillLevel: 0 },
      { name: "yellow drifter", health: 0, experience: 0, skillLevel: 0 },
      { name: "man-o-combat", health: 0, experience: 0, skillLevel: 0 },
      { name: "fastvenom", health: 0, experience: 0, skillLevel: 0 },
      { name: "black", health: 0, experience: 0, skillLevel: 0 },
      { name: "doom", health: 0, experience: 0, skillLevel: 0 },
    ],
  },
  {
    name: "giant ant",
    locations: ["crater"],
    variants: [
      { name: "drone", health: 0, experience: 0, skillLevel: 0 },
      { name: "soldier", health: 0, experience: 0, skillLevel: 0 },
      { name: "amber stripe", health: 0, experience: 0, skillLevel: 0 },
      { name: "prowler", health: 0, experience: 0, skillLevel: 0 },
      { name: "nightwarrior", health: 0, experience: 0, skillLevel: 0 },
      { name: "goliath", health: 0, experience: 0, skillLevel: 0 },
    ],
  },
  {
    name: "pirate",
    locations: ["pirate-hideout"],
    variants: [
      { name: "grumpy", health: 0, experience: 0, skillLevel: 0 },
      { name: "ragged", health: 0, experience: 0, skillLevel: 0 },
      { name: "greedy", health: 0, experience: 0, skillLevel: 0 },
      { name: "cunning", health: 0, experience: 0, skillLevel: 0 },
      { name: "rugged", health: 0, experience: 0, skillLevel: 0 },
      { name: "treacherous", health: 0, experience: 0, skillLevel: 0 },
      { name: "nefarious", health: 0, experience: 0, skillLevel: 0 },
      { name: "swashbuckling", health: 0, experience: 0, skillLevel: 0 },
    ],
  },
  {
    name: "punkupine",
    locations: ["rocky-road"],
    variants: [
      { name: "shabby", health: 0, experience: 0, skillLevel: 0 },
      { name: "striped", health: 0, experience: 0, skillLevel: 0 },
      { name: "neon", health: 0, experience: 0, skillLevel: 0 },
      { name: "watchmen", health: 0, experience: 0, skillLevel: 0 },
      { name: "heavy", health: 0, experience: 0, skillLevel: 0 },
      { name: "orange tipped", health: 0, experience: 0, skillLevel: 0 },
    ],
  },
] as const satisfies readonly MonsterData[];

export default HOPEPORT_MONSTER_DATA;

type MonsterDataEntries = typeof HOPEPORT_MONSTER_DATA;

type MonsterVariantNames<T extends MonsterDataEntries[number]> =
  `${T["variants"][number]["name"]} ${T["name"]}`;

export type HopeportMonsterBaseName =
  (typeof HOPEPORT_MONSTER_DATA)[number]["name"];

export type HopeportMonsterNameWithVariant =
  MonsterDataEntries[number] extends infer T
    ? T extends MonsterDataEntries[number]
      ? MonsterVariantNames<T>
      : never
    : never;
