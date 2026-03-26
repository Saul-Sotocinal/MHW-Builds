import { Armor, Build, Weapon } from '../types/interfaces';

export const EQUIPMENT_ICONS: { [name: string]: any } = {
  // WEAPONS
  "greatsword": require(`@assets/weapon-icons/greatsword.png`),
  "longsword": require(`@assets/weapon-icons/longsword.png`),
  "sword_and_shield": require(`@assets/weapon-icons/sword-and-shield.png`),
  "dual_blades": require(`@assets/weapon-icons/dual-blades.png`),
  "hammer": require(`@assets/weapon-icons/hammer.png`),
  "hunting_horn": require(`@assets/weapon-icons/hunting-horn.png`),
  "lance": require(`@assets/weapon-icons/lance.png`),
  "gunlance": require(`@assets/weapon-icons/gunlance.png`),
  "switch_axe": require(`@assets/weapon-icons/switch-axe.png`),
  "charge_blade": require(`@assets/weapon-icons/charge-blade.png`),
  "insect_glaive": require(`@assets/weapon-icons/insect-glaive.png`),
  "light_bowgun": require(`@assets/weapon-icons/light-bowgun.png`),
  "heavy_bowgun": require(`@assets/weapon-icons/heavy-bowgun.png`),
  "bow": require(`@assets/weapon-icons/bow.png`),

  // ARMOR
  "helm": require(`@assets/armor-icons/helm.webp`),
  "chest": require(`@assets/armor-icons/chest.webp`),
  "gloves": require(`@assets/armor-icons/gloves.webp`),
  "waist": require(`@assets/armor-icons/waist.webp`),
  "legs": require(`@assets/armor-icons/legs.webp`),
  "talisman": require(`@assets/armor-icons/talisman.png`),
}

export const AVAILABLE_ARMORS: Armor[] = [
  { id: 1, name: "Leather Headgear", type: "helm", defense: 2 },
  { id: 2, name: "Leather Mail", type: "chest", defense: 2 },
  { id: 3, name: "Leather Gloves", type: "gloves", defense: 2 },
  { id: 4, name: "Leather Belt", type: "waist", defense: 2 },
  { id: 5, name: "Leather Trousers", type: "legs", defense: 2 },

  { id: 6, name: "Hunter's Headgear", type: "helm", defense: 6 },
  { id: 7, name: "Hunter's Mail", type: "chest", defense: 6 },
  { id: 8, name: "Hunter's Vambraces", type: "gloves", defense: 6 },
  { id: 9, name: "Hunter's Coil", type: "waist", defense: 6 },
  { id: 10, name: "Hunter's Greaves", type: "legs", defense: 6 },

  { id: 11, name: "Jagras Helm", type: "helm", defense: 8 },
  { id: 12, name: "Jagras Mail", type: "chest", defense: 8 },
  { id: 13, name: "Jagras Vambraces", type: "gloves", defense: 8 },
  { id: 14, name: "Jagras Coil", type: "waist", defense: 8 },
  { id: 15, name: "Jagras Greaves", type: "legs", defense: 8 },

  { id: 16, name: "Bone Helm", type: "helm", defense: 6 },
  { id: 17, name: "Bone Mail", type: "chest", defense: 6 },
  { id: 18, name: "Bone Vambraces", type: "gloves", defense: 6 },
  { id: 19, name: "Bone Coil", type: "waist", defense: 6 },
  { id: 20, name: "Bone Greaves", type: "legs", defense: 6 },

  { id: 21, name: "Vespoid Helm", type: "helm", defense: 8 },
  { id: 22, name: "Vespoid Mail", type: "chest", defense: 8 },
  { id: 23, name: "Vespoid Vambraces", type: "gloves", defense: 8 },
  { id: 24, name: "Vespoid Coil", type: "waist", defense: 8 },
  { id: 25, name: "Vespoid Greaves", type: "legs", defense: 8 },

  { id: 26, name: "Evasion Charm", type: "talisman", defense: 0 },
  { id: 27, name: "Health Charm", type: "talisman", defense: 0 },
  { id: 28, name: "Challenger Charm", type: "talisman", defense: 0 }
]


export const AVAILABLE_WEAPONS: Weapon[] = [
  { id: 1, name: "Purgation's Atrocity", type: "greatsword", element: "dragon", damage: 210 },
  { id: 2, name: "Wildbite", type: "greatsword", element: "sleep", damage: 290 },

  { id: 3, name: "Adularia Edge", type: "longsword", element: "ice", damage: 270 },
  { id: 4, name: "Bone Shotel", type: "longsword", element: "raw", damage: 100 },

  { id: 5, name: "Hunter's Knife I", type: "sword_and_shield", element: "raw", damage: 80 },
  { id: 6, name: "Lohensieger", type: "sword_and_shield", element: "fire", damage: 270 },

  { id: 7, name: "Wyvern Lovers", type: "dual_blades", element: "fire", damage: 240 },
  { id: 8, name: "Bone Hatchets I", type: "dual_blades", element: "raw", damage: 100 },

  { id: 9, name: "Buona Florescenza", type: "hammer", element: "poison", damage: 250 },
  { id: 10, name: "Bone Bludgeon I", type: "hammer", element: "raw", damage: 100 },

  { id: 11, name: "Magia Charmbell +", type: "hunting_horn", element: "ice", damage: 621 },
  { id: 12, name: "Austere Paradise", type: "hunting_horn", element: "dragon", damage: 280 },

  { id: 13, name: "Iron Lance I", type: "lance", element: "raw", damage: 80 },
  { id: 14, name: "Knightly Ectis", type: "lance", element: "ice", damage: 270 },

  { id: 15, name: "Iron Gunlance I", type: "gunlance", element: "raw", damage: 80 },
  { id: 16, name: "Ending Fulgur II", type: "gunlance", element: "thunder", damage: 250 },

  { id: 17, name: "Lightbreak Axe", type: "switch_axe", element: "blast", damage: 300 },
  { id: 18, name: "Bone Axe I", type: "switch_axe", element: "raw", damage: 90 },

  { id: 19, name: "Deep Terroir II", type: "charge_blade", element: "water", damage: 260 },
  { id: 20, name: "Bone Strongarm I", type: "charge_blade", element: "raw", damage: 90 },

  { id: 21, name: "Nexus Gae Bolg", type: "insect_glaive", element: "dragon", damage: 240 },
  { id: 22, name: "Bone Rod I", type: "insect_glaive", element: "raw", damage: 90 },

  { id: 23, name: "Chain Blitz I", type: "light_bowgun", element: "raw", damage: 100 },
  { id: 24, name: "Safi's Aquashot", type: "light_bowgun", element: "water", damage: 250 },

  { id: 25, name: "Gluttonous Direcannon", type: "heavy_bowgun", element: "raw", damage: 270 },
  { id: 26, name: "Bone Shooter I", type: "heavy_bowgun", element: "raw", damage: 100 },

  { id: 27, name: "Iron Bow I", type: "bow", element: "raw", damage: 80 },
  { id: 28, name: "Bow of Vice & Violence", type: "bow", element: "dragon", damage: 370 }
]


export const DEFAULT_BUILD: Build = {
  id: "0",
  name: "New Build",
  weapon: { ...AVAILABLE_WEAPONS[4] },
  helm: { ...AVAILABLE_ARMORS[0] },
  chest: { ...AVAILABLE_ARMORS[1] },
  gloves: { ...AVAILABLE_ARMORS[2] },
  waist: { ...AVAILABLE_ARMORS[3] },
  legs: { ...AVAILABLE_ARMORS[4] },
  talisman: { ...AVAILABLE_ARMORS[25] },
}
