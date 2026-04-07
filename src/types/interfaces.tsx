export interface Build {
  id: string;
  name: string;
  weapon: Weapon;
  helm: Armor;
  chest: Armor;
  gloves: Armor;
  waist: Armor;
  legs: Armor;
  talisman: Armor;
}

export type Element = "blast" | "dragon" | "fire" | "ice" | "paralysis"
  | "poison" | "raw" | "sleep" | "thunder" | "water";

export type WeaponType = "greatsword" | "longsword" | "sword_and_shield" | "dual_blades"
  | "hammer" | "hunting_horn" | "lance" | "gunlance" | "switch_axe"
  | "charge_blade" | "insect_glaive" | "light_bowgun" | "heavy_bowgun" | "bow";

export type ArmorType = "helm" | "chest" | "gloves" | "waist" | "legs" | "talisman";

export type Classification = 'bird wyvern' | 'brute wyvern' | 'fanged wyvern' |
  'fanged beast' | 'flying wyvern' | 'piscine wyvern' | 'relict' | 'elder dragon';


export interface Weapon {
  id: number
  name: string;
  type: WeaponType
  element: Element

  damage: number;
}

export interface Armor {
  id: number;
  name: string;
  type: ArmorType;
  defense: number;
}

export interface Charm {
  id: number;
  name: string;
}

export function isWeapon(equipment: Weapon | Armor): equipment is Weapon {
  return (equipment as Weapon).damage !== undefined;
}

export interface FilterItem {
  id: string,
  type: string,
  selected: boolean
}

export interface Monster {
  id: number;
  name: string;
  element: Element
  classification: Classification
}
