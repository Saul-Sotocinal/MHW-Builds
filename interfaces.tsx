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

export interface Weapon {
  name: string;
  type: string;
  element: string;
  damage: number;
}

export interface Armor {
  name: string;
  type: string;
  defense: number;
}