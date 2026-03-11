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

export const ELEMENT_ICONS: { [name: string]: any } = {
  "raw": require(`@assets/element-icons/raw.png`),
  "fire": require(`@assets/element-icons/fire.webp`),
  "thunder": require(`@assets/element-icons/thunder.webp`),
  "dragon": require(`@assets/element-icons/dragon.png`),
  "water": require(`@assets/element-icons/water.webp`),
  "ice": require(`@assets/element-icons/ice.webp`),
  "blast": require(`@assets/element-icons/blast.webp`),
  "paralysis": require(`@assets/element-icons/paralysis.webp`),
  "poison": require(`@assets/element-icons/poison.webp`),
  "sleep": require(`@assets/element-icons/sleep.webp`)
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
  id: "-1",
  name: "New Build",
  weapon: { ...AVAILABLE_WEAPONS[4] },
  helm: { ...AVAILABLE_ARMORS[0] },
  chest: { ...AVAILABLE_ARMORS[1] },
  gloves: { ...AVAILABLE_ARMORS[2] },
  waist: { ...AVAILABLE_ARMORS[3] },
  legs: { ...AVAILABLE_ARMORS[4] },
  talisman: { ...AVAILABLE_ARMORS[25] },
}

export const BUILDS_TEMPLATE: Build[] = [
  {
    id: "1",
    name: "Rejuvination Instamenthormn",
    weapon: { ...AVAILABLE_WEAPONS[10] },
    helm: { ...AVAILABLE_ARMORS[0] },
    chest: { ...AVAILABLE_ARMORS[1] },
    gloves: { ...AVAILABLE_ARMORS[2] },
    waist: { ...AVAILABLE_ARMORS[3] },
    legs: { ...AVAILABLE_ARMORS[4] },
    talisman: { ...AVAILABLE_ARMORS[25] },
  },
  {
    id: "2",
    name: "Vers BLasting",
    weapon: { ...AVAILABLE_WEAPONS[16] },
    helm: { ...AVAILABLE_ARMORS[5] },
    chest: { ...AVAILABLE_ARMORS[6] },
    gloves: { ...AVAILABLE_ARMORS[7] },
    waist: { ...AVAILABLE_ARMORS[8] },
    legs: { ...AVAILABLE_ARMORS[9] },
    talisman: { ...AVAILABLE_ARMORS[26] },
  },
  {
    id: "3",
    name: "For My Dark Spiky Nerg Derg <3",
    weapon: { ...AVAILABLE_WEAPONS[15] },
    helm: { ...AVAILABLE_ARMORS[10] },
    chest: { ...AVAILABLE_ARMORS[11] },
    gloves: { ...AVAILABLE_ARMORS[12] },
    waist: { ...AVAILABLE_ARMORS[13] },
    legs: { ...AVAILABLE_ARMORS[14] },
    talisman: { ...AVAILABLE_ARMORS[26] },
  },
  {
    id: "4",
    name: "Killed Raths for this",
    weapon: { ...AVAILABLE_WEAPONS[6] },
    helm: { ...AVAILABLE_ARMORS[15] },
    chest: { ...AVAILABLE_ARMORS[16] },
    gloves: { ...AVAILABLE_ARMORS[17] },
    waist: { ...AVAILABLE_ARMORS[18] },
    legs: { ...AVAILABLE_ARMORS[19] },
    talisman: { ...AVAILABLE_ARMORS[25] },
  },
  {
    id: "5",
    name: "Gae Bolg Build",
    weapon: { ...AVAILABLE_WEAPONS[20] },
    helm: { ...AVAILABLE_ARMORS[20] },
    chest: { ...AVAILABLE_ARMORS[21] },
    gloves: { ...AVAILABLE_ARMORS[22] },
    waist: { ...AVAILABLE_ARMORS[23] },
    legs: { ...AVAILABLE_ARMORS[24] },
    talisman: { ...AVAILABLE_ARMORS[27] },
  },
  {
    id: "6",
    name: "Sticky LBG",
    weapon: { ...AVAILABLE_WEAPONS[23] },
    helm: { ...AVAILABLE_ARMORS[20] },
    chest: { ...AVAILABLE_ARMORS[21] },
    gloves: { ...AVAILABLE_ARMORS[22] },
    waist: { ...AVAILABLE_ARMORS[23] },
    legs: { ...AVAILABLE_ARMORS[24] },
    talisman: { ...AVAILABLE_ARMORS[27] },
  },
  {
    id: "7",
    name: "\"Great\"sword frfr",
    weapon: { ...AVAILABLE_WEAPONS[1] },
    helm: { ...AVAILABLE_ARMORS[20] },
    chest: { ...AVAILABLE_ARMORS[21] },
    gloves: { ...AVAILABLE_ARMORS[22] },
    waist: { ...AVAILABLE_ARMORS[23] },
    legs: { ...AVAILABLE_ARMORS[24] },
    talisman: { ...AVAILABLE_ARMORS[27] },
  },
  {
    id: "8",
    name: "Safi'jiiva Hammer Build",
    weapon: { ...AVAILABLE_WEAPONS[8] },
    helm: { ...AVAILABLE_ARMORS[0] },
    chest: { ...AVAILABLE_ARMORS[1] },
    gloves: { ...AVAILABLE_ARMORS[2] },
    waist: { ...AVAILABLE_ARMORS[3] },
    legs: { ...AVAILABLE_ARMORS[4] },
    talisman: { ...AVAILABLE_ARMORS[25] },
  },
];