import { Armor, Charm, Weapon } from "@/types/interfaces"

interface Element {
  type: string,
  damage: number,
  hidden: boolean
}
interface Attack {
  display: number,
  raw: number
}
interface Defense {
  base: number,
  max: number,
  augmented: number
}

export interface WeaponData {
  id: number,
  name: string,
  type: string,
  elements: Element[]
  attack: Attack,
}

export interface ArmorData {
  id: number,
  name: string,
  type: string,
  defense: Defense
}

export interface CharmData {
  id: number,
  name: string
}

function isWeaponDataArray(object: unknown): object is WeaponData[] {
  const array: WeaponData[] = object as WeaponData[]

  return array[0] !== undefined && array[0].attack !== undefined && array[0].attack.raw !== undefined
}
function isArmorDataArray(object: unknown): object is ArmorData[] {
  const array: ArmorData[] = object as ArmorData[]

  return array[0] !== undefined && array[0].defense !== undefined && array[0].defense.base !== undefined
}
function isCharmDataArray(object: unknown): object is CharmData[] {
  const array: CharmData[] = object as CharmData[]

  return array[0] !== undefined && array[0].id !== undefined && array[0].name !== undefined
}

export async function fetchWeaponData(): Promise<Weapon[]> {
  const url = `https://mhw-db.com/weapons`

  const res = await fetch(url)

  if (!res.ok)
    throw new Error('Could not fetch weapon data.')

  const weaponsData: unknown = await res.json()

  if (!isWeaponDataArray(weaponsData))
    throw new Error('API response was not in expected format.')

  for (let i = 0; i < weaponsData.length; i++) {
    if (weaponsData[i].elements.length === 0) {
      weaponsData[i].elements.push({
        type: 'raw',
        damage: 0,
        hidden: false
      })
    }
  }

  const weapons: Weapon[] = weaponsData.map(weapon => ({
    id: weapon.id,
    name: weapon.name,
    type: weapon.type,
    element: weapon.elements[0].type,
    attack: weapon.attack.raw
  } as Weapon))

  return weapons
}
export async function fetchArmorData(): Promise<Armor[]> {
  const url = `https://mhw-db.com/armor`

  const res = await fetch(url)

  if (!res.ok)
    throw new Error('Could not fetch armor data.')

  const armorData: unknown = await res.json()

  if (!isArmorDataArray(armorData))
    throw new Error('API response was not in expected format')

  const armors: Armor[] = armorData.map(armor => ({
    id: armor.id,
    name: armor.name,
    type: armor.type,
    defense: armor.defense.base
  } as Armor))

  return armors
}
export async function fetchCharmsData(): Promise<Charm[]> {
  const url = `https://mhw-db.com/charms`

  const res = await fetch(url)

  if (!res.ok)
    throw new Error('Could not fetch charm data.')

  const charmData: unknown = await res.json()

  if (!isCharmDataArray(charmData))
    throw new Error('API response was not in expected format')

  const charms: Charm[] = charmData.map(charm => ({
    id: charm.id,
    name: charm.name,
    type: 'charm'
  } as Charm))

  return charms
}
