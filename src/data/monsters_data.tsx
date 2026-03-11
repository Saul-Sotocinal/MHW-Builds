export const MONSTERS: Monster[] = [
  { id: 1, name: "nergigante", type: "elder dragon", element: "raw" },
  { id: 2, name: "safi'jiiva", type: "elder dragon", element: "fire" },
  { id: 3, name: "coral_pukei-pukei", type: "bird wyvern", element: "water" },
  { id: 4, name: "raging_brachydios", type: "brute wyvern", element: "blast" },
  { id: 5, name: "furious_rajang", type: "fanged beast", element: "thunder" },
  { id: 6, name: "stygian_zinogre", type: "fanged wyvern", element: "dragon" },
  { id: 7, name: "viper_tobi-kadachi", type: "fanged wyvern", element: "paralysis" },
  { id: 8, name: "nargacuga", type: "flying wyvern", element: "raw" },
  { id: 9, name: "pink_rathian", type: "flying wyvern", element: "poison" },
  { id: 10, name: "nightshade_paolumu", type: "flying wyvern", element: "sleep" },
  { id: 11, name: "beotodus", type: "piscine wyvern", element: "ice" },
]

export const MONSTER_ICONS: { [name: string]: any } = {
  "nergigante": require(`@assets/monster-icons/nergigante.png`),
  "safi'jiiva": require(`@assets/monster-icons/safi'jiiva.png`),
  "coral_pukei-pukei": require(`@assets/monster-icons/coral_pukei-pukei.png`),
  "raging_brachydios": require(`@assets/monster-icons/raging_brachydios.png`),
  "furious_rajang": require(`@assets/monster-icons/furious_rajang.png`),
  "stygian_zinogre": require(`@assets/monster-icons/stygian_zinogre.png`),
  "viper_tobi-kadachi": require(`@assets/monster-icons/viper_tobi-kadachi.png`),
  "nargacuga": require(`@assets/monster-icons/nargacuga.png`),
  "pink_rathian": require(`@assets/monster-icons/pink_rathian.png`),
  "nightshade_paolumu": require(`@assets/monster-icons/nightshade_paolumu.png`),
  "beotodus": require(`@assets/monster-icons/beotodus.png`),
}

export interface Monster {
  id: number;
  name: string;
  type: "bird wyvern" | "brute wyvern" | "fanged wyvern" | "fanged beast"
  | "flying wyvern" | "piscine wyvern" | "relict" | "elder dragon";

  element: "blast" | "dragon" | "fire" | "ice" | "paralysis"
  | "poison" | "raw" | "sleep" | "thunder" | "water";
}