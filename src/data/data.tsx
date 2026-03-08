import { Build } from '../types/interfaces';

export const EQUIPMENT_ICONS: { [name: string]: any} = {
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

export const ELEMENT_ICONS: { [name: string]: any} = {
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

export const BUILDS_TEMPLATE: Build[] = [
  { id: "1", 
    name: "Rejuvination Instramenthormn",
    weapon: { name: "Magia Charmbell", type: "hunting_horn", element: "water", damage: 180 },
    helm: { name: "Anja Helm", type: "helm", defense: 12 },
    chest: { name: "Rathalos Mail", type: "chest", defense: 36 },
    gloves: { name: "Kadachi Vambraces", type: "gloves", defense: 30 },
    waist: { name: "Guild Palace Coil", type: "waist", defense: 25 },
    legs: { name: "Nergigante Greaves", type: "legs", defense: 20 },
    talisman: { name: "Evasion Charm", type: "talisman", defense: 0 },
  },
  {
    id: "2",
    name: "Alatreon Swaxe",
    weapon: { name: "Lightbreak Axe", type: "switch_axe", element: "blast", damage: 300 },
    helm: { name: "Kaiser Crown B+", type: "helm", defense: 174 },
    chest: { name: "Brachydium Mail B+", type: "chest", defense: 188 },
    gloves: { name: "Kaiser Vambraces B+", type: "gloves", defense: 174 },
    waist: { name: "Kaiser Coil B+", type: "waist", defense: 174 },
    legs: { name: "Brachydium Greaves B+", type: "legs", defense: 188 },
    talisman: { name: "Evasion Charm III", type: "talisman", defense: 0 }
},
{
    id: "3",
    name: "\"Great\"Sword frfr",
    weapon: { name: "Black Harvest", type: "greatsword", element: "dragon", damage: 280 },
    helm: { name: "Bracydium Helm B+", type: "helm", defense: 188 },
    chest: { name: "Escadora Soul B+", type: "chest", defense: 178 },
    gloves: { name: "Escadora Armguards A+", type: "gloves", defense: 178 },
    waist: { name: "Escadora Might B+", type: "waist", defense: 178 },
    legs: { name: "Brachydium Greaves B+", type: "legs", defense: 188 },
    talisman: { name: "Evasion Charm III", type: "talisman", defense: 0 }
},
{
    id: "4",
    name: "Frosty Sky insectoid stick",
    weapon: { name: "Moonstone Hoarfrost",type: "insect_glaive", element: "ice", damage: 270 },
    helm: { name: "Kaiser Crown B+", type: "helm", defense: 178 },
    chest: { name: "Brachydium Mail B+", type: "chest", defense: 188 },
    gloves: { name: "Kaiser Vambraces B+", type: "gloves", defense: 178 },
    waist: { name: "Kaiser Coil B+", type: "waist", defense: 178 },
    legs: { name: "Brachydium Greaves B+", type: "legs", defense: 188 },
    talisman: { name: "Evasion Charm III", type: "talisman", defense: 0 }
},
{
    id: "5",
    name: "Dark Spikey Nerg Derg Set",
    weapon: { name: "Ruinous Decimation", type: "dual_blades", element: "raw", damage: 280 },
    helm: { name: "Ruinous Helm B+", type: "helm", defense: 168 },
    chest: { name: "Ruinous Mail B+", type: "chest", defense: 168 },
    gloves: { name: "Ruinous Vambraces B+", type: "gloves", defense: 168 },
    waist: { name: "Ruinous Coil B+", type: "waist", defense: 168 },
    legs: { name: "Ruinous Greaves B+", type: "legs", defense: 168 },
    talisman: { name: "Agitator Charm V", type: "talisman", defense: 0 }
},
  { id: "6", 
    name: "Idk",
    weapon: { name: "Magia Charmbell", type: "longsword", element: "fire", damage: 180 },
    helm: { name: "Anja Helm", type: "helm", defense: 12 },
    chest: { name: "Rathalos Mail", type: "chest", defense: 36 },
    gloves: { name: "Kadachi Vambraces", type: "gloves", defense: 30 },
    waist: { name: "Guild Palace Coil", type: "waist", defense: 25 },
    legs: { name: "Nergigante Greaves", type: "legs", defense: 20 },
    talisman: { name: "Evasion Charm", type: "talisman", defense: 0 },
  },
  {
    id: "7",
    name: "ran out of ideas",
    weapon: { name: "Lightbreak Axe", type: "lance", element: "poison", damage: 300 },
    helm: { name: "Kaiser Crown B+", type: "helm", defense: 174 },
    chest: { name: "Brachydium Mail B+", type: "chest", defense: 188 },
    gloves: { name: "Kaiser Vambraces B+", type: "gloves", defense: 174 },
    waist: { name: "Kaiser Coil B+", type: "waist", defense: 174 },
    legs: { name: "Brachydium Greaves B+", type: "legs", defense: 188 },
    talisman: { name: "Evasion Charm III", type: "talisman", defense: 0 }
},
{
    id: "8",
    name: "build name or smthg",
    weapon: { name: "Black Harvest", type: "greatsword", element: "thunder", damage: 280 },
    helm: { name: "Bracydium Helm B+", type: "helm", defense: 188 },
    chest: { name: "Escadora Soul B+", type: "chest", defense: 178 },
    gloves: { name: "Escadora Armguards A+", type: "gloves", defense: 178 },
    waist: { name: "Escadora Might B+", type: "waist", defense: 178 },
    legs: { name: "Brachydium Greaves B+", type: "legs", defense: 188 },
    talisman: { name: "Evasion Charm III", type: "talisman", defense: 0 }
},
{
    id: "9",
    name: "bigshot",
    weapon: { name: "Moonstone Hoarfrost",type: "heavy_bowgun", element: "paralysis", damage: 270 },
    helm: { name: "Kaiser Crown B+", type: "helm", defense: 178 },
    chest: { name: "Brachydium Mail B+", type: "chest", defense: 188 },
    gloves: { name: "Kaiser Vambraces B+", type: "gloves", defense: 178 },
    waist: { name: "Kaiser Coil B+", type: "waist", defense: 178 },
    legs: { name: "Brachydium Greaves B+", type: "legs", defense: 188 },
    talisman: { name: "Evasion Charm III", type: "talisman", defense: 0 }
},
{
    id: "10",
    name: "pew pew",
    weapon: { name: "Ruinous Decimation", type: "light_bowgun", element: "sleep", damage: 280 },
    helm: { name: "Ruinous Helm B+", type: "helm", defense: 168 },
    chest: { name: "Ruinous Mail B+", type: "chest", defense: 168 },
    gloves: { name: "Ruinous Vambraces B+", type: "gloves", defense: 168 },
    waist: { name: "Ruinous Coil B+", type: "waist", defense: 168 },
    legs: { name: "Ruinous Greaves B+", type: "legs", defense: 168 },
    talisman: { name: "Agitator Charm V", type: "talisman", defense: 0 }
}
];