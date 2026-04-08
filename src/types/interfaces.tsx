export interface Build {
  id: number;
  name: string;
  weapon: Weapon;
  head: Armor;
  chest: Armor;
  gloves: Armor;
  waist: Armor;
  legs: Armor;
  charm: Charm;
}

export type Element = "blast" | "dragon" | "fire" | "ice" | "paralysis"
  | "poison" | "raw" | "sleep" | "thunder" | "water";

export type WeaponType = "greatsword" | "longsword" | "sword_and_shield" | "dual_blades"
  | "hammer" | "hunting_horn" | "lance" | "gunlance" | "switch_axe"
  | "charge_blade" | "insect_glaive" | "light_bowgun" | "heavy_bowgun" | "bow";

export type ArmorType = "head" | "chest" | "gloves" | "waist" | "legs" | "charm";

export type Classification = 'bird wyvern' | 'brute wyvern' | 'fanged wyvern' |
  'fanged beast' | 'flying wyvern' | 'piscine wyvern' | 'relict' | 'elder dragon';


export interface Weapon {
  id: number
  name: string;
  type: WeaponType
  element: Element

  attack: number;
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
  type: "charm";
}

export function isWeapon(equipment: Weapon | Armor| Charm): equipment is Weapon {
  return (equipment as Weapon).attack !== undefined;
}

export function isArmor(equipment: Armor | Charm): equipment is Armor {
  return (equipment as Armor).defense !== undefined
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
