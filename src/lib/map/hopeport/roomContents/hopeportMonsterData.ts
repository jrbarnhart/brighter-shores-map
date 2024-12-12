import { MonsterData } from "@/lib/types";

const HOPEPORT_MONSTER_DATA = [
  {
    name: "sparring guard",
    locations: ["sparring-area"],
    attackDamage: "impact",
    variants: [
      {
        name: "recruit",
        monsterLevel: 0,
        unlockLevel: 0,
      },
      {
        name: "rookie",
        monsterLevel: 18,
        unlockLevel: 12,
      },
      {
        name: "patrol",
        monsterLevel: 71,
        unlockLevel: 52,
      },
      {
        name: "wall",
        monsterLevel: 129,
        unlockLevel: 110,
      },
      {
        name: "veteran",
        monsterLevel: 180,
        unlockLevel: 160,
      },
      {
        name: "decorated",
        monsterLevel: 345,
        unlockLevel: 290,
      },
    ],
  },
  {
    name: "deathcrow",
    locations: ["town-gates", "old-street-east"],
    attackDamage: "necromae",
    vulnerableDamage: "cryonae",
    immuneDamage: "necromae",
    variants: [
      {
        name: "glinteye",
        monsterLevel: 2,
        unlockLevel: 0,
      },
      {
        name: "beady-eyed",
        monsterLevel: 10,
        unlockLevel: 16,
      },
      {
        name: "wily",
        monsterLevel: 60,
        unlockLevel: 41,
      },
      {
        name: "slickwing",
        monsterLevel: 104,
        unlockLevel: 85,
      },
      {
        name: "shadowy",
        monsterLevel: 155,
        unlockLevel: 135,
      },
      {
        name: "vicious",
        monsterLevel: 200,
        unlockLevel: 180,
      },
      {
        name: "malevolent",
        monsterLevel: 372,
        unlockLevel: 308,
      },
    ],
  },
  {
    name: "thief",
    locations: ["tims-alley", "limpet-lane"],
    aggressive: true,
    attackDamage: "cryonae",
    vulnerableDamage: "arborae",
    immuneDamage: "cryonae",
    variants: [
      {
        name: "common",
        monsterLevel: 4,
        unlockLevel: 0,
      },
      {
        name: "scruffy",
        monsterLevel: 22,
        unlockLevel: 14,
      },
      {
        name: "loitering",
        monsterLevel: 66,
        unlockLevel: 47,
      },
      {
        name: "shifty",
        monsterLevel: 115,
        unlockLevel: 96,
      },
      {
        name: "crafty",
        monsterLevel: 160,
        unlockLevel: 143,
      },
      {
        name: "sneaky",
        monsterLevel: 245,
        unlockLevel: 194,
      },
      {
        name: "dangerous",
        monsterLevel: 390,
        unlockLevel: 326,
      },
    ],
  },
  {
    name: "goblin solider",
    locations: ["north-walls"],
    aggressive: true,
    attackDamage: "infernae",
    vulnerableDamage: "tempestae",
    immuneDamage: "infernae",
    variants: [
      {
        name: "looter",
        monsterLevel: 6,
        unlockLevel: 0,
      },
      {
        name: "hooligan",
        monsterLevel: 28,
        unlockLevel: 16,
      },
      {
        name: "plunderer",
        monsterLevel: 77,
        unlockLevel: 60,
      },
      {
        name: "raider",
        monsterLevel: 124,
        unlockLevel: 104,
      },
      {
        name: "marauder",
        monsterLevel: 169,
        unlockLevel: 149,
      },
      {
        name: "trooper",
        monsterLevel: 263,
        unlockLevel: 200,
      },
      {
        name: "warrior",
        monsterLevel: 435,
        unlockLevel: 372,
      },
    ],
  },
  {
    name: "goblin chief",
    locations: ["south-walls"],
    aggressive: true,
    attackDamage: "infernae",
    vulnerableDamage: "tempestae",
    immuneDamage: "infernae",
    variants: [
      {
        name: "irritable",
        monsterLevel: 8,
        unlockLevel: 0,
      },
      {
        name: "bossy",
        monsterLevel: 41,
        unlockLevel: 22,
      },
      {
        name: "robust",
        monsterLevel: 96,
        unlockLevel: 77,
      },
      {
        name: "authoritative",
        monsterLevel: 149,
        unlockLevel: 129,
      },
      {
        name: "fierce",
        monsterLevel: 227,
        unlockLevel: 188,
      },
      {
        name: "preeminent",
        monsterLevel: 408,
        unlockLevel: 345,
      },
    ],
  },
  {
    name: "hairbeast",
    locations: ["overgrown-road", "rubble-road"],
    attackDamage: "tempestae",
    vulnerableDamage: "necromae",
    immuneDamage: "tempestae",
    variants: [
      {
        name: "feral",
        monsterLevel: 10,
        unlockLevel: 0,
      },
      {
        name: "tangled",
        monsterLevel: 33,
        unlockLevel: 18,
      },
      {
        name: "lumbering",
        monsterLevel: 85,
        unlockLevel: 66,
      },
      {
        name: "shaggy",
        monsterLevel: 135,
        unlockLevel: 115,
      },
      {
        name: "hefty",
        monsterLevel: 188,
        unlockLevel: 169,
      },
      {
        name: "savage",
        monsterLevel: 308,
        unlockLevel: 245,
      },
      {
        name: "psychic",
        monsterLevel: 453,
        unlockLevel: 390,
      },
    ],
  },
  {
    name: "carnivorous plant",
    locations: ["overgrown-field", "fallen-monument"],
    attackDamage: "arborae",
    vulnerableDamage: "cryonae",
    immuneDamage: "arborae",
    variants: [
      {
        name: "greenlid",
        monsterLevel: 12,
        unlockLevel: 0,
      },
      {
        name: "snap",
        monsterLevel: 47,
        unlockLevel: 28,
      },
      {
        name: "leafjaw",
        monsterLevel: 90,
        unlockLevel: 71,
      },
      {
        name: "munching",
        monsterLevel: 143,
        unlockLevel: 124,
      },
      {
        name: "bladefang",
        monsterLevel: 194,
        unlockLevel: 174,
      },
      {
        name: "armsnapper",
        monsterLevel: 326,
        unlockLevel: 263,
      },
      {
        name: "bonecruncher",
        monsterLevel: 490,
        unlockLevel: 435,
      },
    ],
  },
  {
    name: "ghoul",
    locations: ["collapsed-hovels", "wasteland"],
    aggressive: true,
    attackDamage: "necromae",
    vulnerableDamage: "arborae",
    immuneDamage: "necromae",
    variants: [
      {
        name: "shambling",
        monsterLevel: 0,
        unlockLevel: 14,
      },
      {
        name: "foraging",
        monsterLevel: 52,
        unlockLevel: 33,
      },
      {
        name: "pale",
        monsterLevel: 110,
        unlockLevel: 90,
      },
      {
        name: "crazed",
        monsterLevel: 174,
        unlockLevel: 155,
      },
      {
        name: "prowling",
        monsterLevel: 290,
        unlockLevel: 227,
      },
      {
        name: "frenzied",
        monsterLevel: 471,
        unlockLevel: 408,
      },
    ],
  },
  {
    name: "street louse",
    locations: ["wilhope-passage"],
    passive: true,
    attackDamage: "impact",
    variants: [
      {
        name: "creepy",
        monsterLevel: 20,
        unlockLevel: 20,
      },
      {
        name: "blotchy",
        monsterLevel: 69,
        unlockLevel: 69,
      },
      {
        name: "black",
        monsterLevel: 107,
        unlockLevel: 107,
      },
      {
        name: "copper",
        monsterLevel: 157,
        unlockLevel: 157,
      },
      {
        name: "angry",
        monsterLevel: 218,
        unlockLevel: 218,
      },
      {
        name: "furious",
        monsterLevel: 354,
        unlockLevel: 354,
      },
    ],
  },
  {
    name: "thug",
    locations: ["murk-close"],
    passive: true,
    attackDamage: "impact",
    variants: [
      {
        name: "back alley",
        monsterLevel: 25,
        unlockLevel: 25,
      },
      {
        name: "scruffy",
        monsterLevel: 58,
        unlockLevel: 58,
      },
      {
        name: "loutish",
        monsterLevel: 101,
        unlockLevel: 101,
      },
      {
        name: "rowdy",
        monsterLevel: 138,
        unlockLevel: 138,
      },
      {
        name: "angry",
        monsterLevel: 177,
        unlockLevel: 177,
      },
      {
        name: "tough",
        monsterLevel: 236,
        unlockLevel: 236,
      },
      {
        name: "elite",
        monsterLevel: 381,
        unlockLevel: 381,
      },
    ],
  },
  {
    name: "crab",
    locations: ["east-beach"],
    passive: true,
    attackDamage: "impact",
    variants: [
      {
        name: "pearlcap",
        monsterLevel: 30,
        unlockLevel: 30,
      },
      {
        name: "large",
        monsterLevel: 63,
        unlockLevel: 63,
      },
      {
        name: "blue scuttler",
        monsterLevel: 93,
        unlockLevel: 93,
      },
      {
        name: "bloodclaw",
        monsterLevel: 126,
        unlockLevel: 126,
      },
      {
        name: "granite shell",
        monsterLevel: 166,
        unlockLevel: 166,
      },
      {
        name: "boulder",
        monsterLevel: 209,
        unlockLevel: 209,
      },
      {
        name: "giant boulder",
        monsterLevel: 299,
        unlockLevel: 299,
      },
      {
        name: "enormous",
        monsterLevel: 417,
        unlockLevel: 417,
      },
    ],
  },
  {
    name: "bugman",
    locations: ["overgrown-pond"],
    passive: true,
    attackDamage: "impact",
    variants: [
      {
        name: "primitive",
        monsterLevel: 36,
        unlockLevel: 36,
      },
      {
        name: "hungry",
        monsterLevel: 74,
        unlockLevel: 74,
      },
      {
        name: "scavenging",
        monsterLevel: 112,
        unlockLevel: 112,
      },
      {
        name: "ugly",
        monsterLevel: 146,
        unlockLevel: 146,
      },
      {
        name: "widejaw",
        monsterLevel: 185,
        unlockLevel: 185,
      },
      {
        name: "hunter",
        monsterLevel: 281,
        unlockLevel: 281,
      },
      {
        name: "terrifying",
        monsterLevel: 399,
        unlockLevel: 399,
      },
    ],
  },
  {
    name: "jellyfish",
    locations: ["jellyfish-landing"],
    passive: true,
    attackDamage: "impact",
    variants: [
      {
        name: "tiderider",
        monsterLevel: 39,
        unlockLevel: 39,
      },
      {
        name: "orange stinger",
        monsterLevel: 79,
        unlockLevel: 79,
      },
      {
        name: "yellow drifter",
        monsterLevel: 118,
        unlockLevel: 118,
      },
      {
        name: "man-o-combat",
        monsterLevel: 169,
        unlockLevel: 169,
      },
      {
        name: "fastvenom",
        monsterLevel: 197,
        unlockLevel: 197,
      },
      {
        name: "black",
        monsterLevel: 317,
        unlockLevel: 317,
      },
      {
        name: "doom",
        monsterLevel: 444,
        unlockLevel: 444,
      },
    ],
  },
  {
    name: "giant ant",
    locations: ["crater"],
    passive: true,
    attackDamage: "impact",
    variants: [
      {
        name: "drone",
        monsterLevel: 44,
        unlockLevel: 44,
      },
      {
        name: "soldier",
        monsterLevel: 88,
        unlockLevel: 88,
      },
      {
        name: "amber stripe",
        monsterLevel: 132,
        unlockLevel: 132,
      },
      {
        name: "prowler",
        monsterLevel: 171,
        unlockLevel: 171,
      },
      {
        name: "nightwarrior",
        monsterLevel: 272,
        unlockLevel: 272,
      },
      {
        name: "goliath",
        monsterLevel: 426,
        unlockLevel: 426,
      },
    ],
  },
  {
    name: "pirate",
    locations: ["pirate-hideout"],
    passive: true,
    attackDamage: "impact",
    variants: [
      {
        name: "grumpy",
        monsterLevel: 49,
        unlockLevel: 49,
      },
      {
        name: "ragged",
        monsterLevel: 82,
        unlockLevel: 82,
      },
      {
        name: "greedy",
        monsterLevel: 121,
        unlockLevel: 121,
      },
      {
        name: "cunning",
        monsterLevel: 152,
        unlockLevel: 152,
      },
      {
        name: "rugged",
        monsterLevel: 183,
        unlockLevel: 183,
      },
      {
        name: "treacherous",
        monsterLevel: 254,
        unlockLevel: 254,
      },
      {
        name: "nefarious",
        monsterLevel: 363,
        unlockLevel: 363,
      },
      {
        name: "swashbuckling",
        monsterLevel: 480,
        unlockLevel: 480,
      },
    ],
  },
  {
    name: "punkupine",
    locations: ["rocky-road"],
    passive: true,
    attackDamage: "impact",
    variants: [
      {
        name: "shabby",
        monsterLevel: 55,
        unlockLevel: 55,
      },
      {
        name: "striped",
        monsterLevel: 99,
        unlockLevel: 99,
      },
      {
        name: "neon",
        monsterLevel: 140,
        unlockLevel: 140,
      },
      {
        name: "watchmen",
        monsterLevel: 191,
        unlockLevel: 191,
      },
      {
        name: "heavy",
        monsterLevel: 335,
        unlockLevel: 335,
      },
      {
        name: "orange tipped",
        monsterLevel: 462,
        unlockLevel: 462,
      },
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
