export const MONSTERS: Monster[] = [
  { id: 1, name: "Nergigante", type: "elder dragon", element: "raw" },
  { id: 2, name: "Safi'jiiva", type: "elder dragon", element: "fire" },
  { id: 3, name: "Coral Pukei-Pukei", type: "bird wyvern", element: "water" },
  { id: 4, name: "Raging Brachydios", type: "brute wyvern", element: "blast" },
  { id: 5, name: "Furious Rajang", type: "fanged beast", element: "thunder" },
  { id: 6, name: "Stygian Zinogre", type: "fanged wyvern", element: "dragon" },
  { id: 7, name: "Viper Tobi-Kadachi", type: "fanged wyvern", element: "paralysis" },
  { id: 8, name: "Nargacuga", type: "flying wyvern", element: "raw" },
  { id: 9, name: "Pink Rathian", type: "flying wyvern", element: "poison" },
  { id: 10, name: "Nightshade Paolumu", type: "flying wyvern", element: "sleep" },
  { id: 11, name: "Beotodus", type: "piscine wyvern", element: "ice" },
]

export const MONSTER_ICONS: { [name: string]: any } = {
  "Nergigante": require(`@assets/monster-icons/nergigante.png`),
  "Safi'jiiva": require(`@assets/monster-icons/safi'jiiva.png`),
  "Coral Pukei-Pukei": require(`@assets/monster-icons/coral_pukei-pukei.png`),
  "Raging Brachydios": require(`@assets/monster-icons/raging_brachydios.png`),
  "Furious Rajang": require(`@assets/monster-icons/furious_rajang.png`),
  "Stygian Zinogre": require(`@assets/monster-icons/stygian_zinogre.png`),
  "Viper Tobi-Kadachi": require(`@assets/monster-icons/viper_tobi-kadachi.png`),
  "Nargacuga": require(`@assets/monster-icons/nargacuga.png`),
  "Pink Rathian": require(`@assets/monster-icons/pink_rathian.png`),
  "Nightshade Paolumu": require(`@assets/monster-icons/nightshade_paolumu.png`),
  "Beotodus": require(`@assets/monster-icons/beotodus.png`),
}

export interface Monster {
  id: number;
  name: string;
  type: "bird wyvern" | "brute wyvern" | "fanged wyvern" | "fanged beast" | "flying wyvern" | "piscine wyvern" | "relict" | "elder dragon";

  element: "blast" | "dragon" | "fire" | "ice" | "paralysis" | "poison" | "raw" | "sleep" | "thunder" | "water";
}