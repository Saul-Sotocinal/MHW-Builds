import { Armor, Build, Charm, Weapon } from "@/types/interfaces";

export type BuildsState = {
  builds: Build[];
  weapons: Weapon[];
  filteredWeapons: Weapon[];
  armors: Armor[];
  filteredArmors: Armor[];
  charms: Charm[];
  filteredCharms: Charm[];
  isLoading: boolean;
  error: string | null
}

export type BuildsAction =
  { action: 'loadStart' | 'loadSuccess', builds: Build[] } |
  { action: 'loadError', errorMsg: string } |
  { action: 'addSuccess', payload: Build } |
  { action: 'updateSuccess', id: number, payload: Build } |
  { action: 'removeSuccess', id: number } |
  { action: 'weaponFetchStart' | 'weaponFetchSuccess', payload: Weapon[] } |
  { action: 'armorFetchStart' | 'armorFetchSuccess', payload: Armor[] } |
  { action: 'charmFetchStart' | 'charmFetchSuccess', payload: Charm[] } |
  { action: 'fetchError', errorMsg: string } |
  { action: 'filterWeapons' | 'filterArmors' | 'filterCharms', query: string }

export function buildsReducer(state: BuildsState, action: BuildsAction): BuildsState {
  switch (action.action) {
    case 'loadStart':
    case 'weaponFetchStart':
    case 'armorFetchStart':
    case 'charmFetchStart':
      return {
        builds: state.builds,
        weapons: state.weapons,
        filteredWeapons: state.weapons,
        armors: state.armors,
        filteredArmors: state.armors,
        charms: state.charms,
        filteredCharms: state.charms,
        isLoading: true,
        error: null
      }
    case "loadSuccess":
      return {
        builds: action.builds,
        weapons: state.weapons,
        filteredWeapons: state.weapons,
        armors: state.armors,
        filteredArmors: state.armors,
        charms: state.charms,
        filteredCharms: state.charms,
        isLoading: false,
        error: null
      }
    case "weaponFetchSuccess":
      return {
        builds: state.builds,
        weapons: action.payload,
        filteredWeapons: action.payload,
        armors: state.armors,
        filteredArmors: state.armors,
        charms: state.charms,
        filteredCharms: state.charms,
        isLoading: false,
        error: null
      }
    case "armorFetchSuccess":
      return {
        builds: state.builds,
        weapons: state.weapons,
        filteredWeapons: state.filteredWeapons,
        armors: action.payload,
        filteredArmors: action.payload,
        charms: state.charms,
        filteredCharms: state.charms,
        isLoading: false,
        error: null
      }
    case "charmFetchSuccess":
      return {
        builds: state.builds,
        weapons: state.weapons,
        filteredWeapons: state.filteredWeapons,
        armors: state.armors,
        filteredArmors: state.armors,
        charms: action.payload,
        filteredCharms: action.payload,
        isLoading: false,
        error: null
      }
    case "loadError":
    case 'fetchError':
      return {
        builds: [],
        weapons: state.weapons,
        filteredWeapons: state.filteredWeapons,
        armors: state.armors,
        filteredArmors: state.armors,
        charms: state.charms,
        filteredCharms: state.charms,
        isLoading: false,
        error: action.errorMsg
      }
    case "addSuccess":
      return {
        builds: [...state.builds, action.payload],
        weapons: state.weapons,
        filteredWeapons: state.filteredWeapons,
        armors: state.armors,
        filteredArmors: state.armors,
        charms: state.charms,
        filteredCharms: state.charms,
        isLoading: false,
        error: null
      }
    case "updateSuccess":
      return {
        builds: state.builds.map((build) => {
          if (build.id !== action.id)
            return build
          return action.payload
        }),
        weapons: state.weapons,
        filteredWeapons: state.filteredWeapons,
        armors: state.armors,
        filteredArmors: state.armors,
        charms: state.charms,
        filteredCharms: state.charms,
        isLoading: false,
        error: null
      }
    case "removeSuccess":
      return {
        builds: state.builds.filter((build) => build.id !== action.id),
        weapons: state.weapons,
        filteredWeapons: state.filteredWeapons,
        armors: state.armors,
        filteredArmors: state.armors,
        charms: state.charms,
        filteredCharms: state.charms,
        isLoading: false,
        error: null
      }
    case "filterWeapons":
      return {
        builds: state.builds,
        weapons: state.weapons,
        filteredWeapons: state.weapons.filter(weapon => {
          return weapon.name.toLowerCase().includes(action.query.toLowerCase())
        }),
        armors: state.armors,
        filteredArmors: state.armors,
        charms: state.charms,
        filteredCharms: state.charms,
        isLoading: false,
        error: null
      }
    case "filterArmors":
      return {
        builds: state.builds,
        weapons: state.weapons,
        filteredWeapons: state.filteredWeapons,
        armors: state.armors,
        filteredArmors: state.armors.filter(armor => {
          return armor.name.toLowerCase().includes(action.query.toLowerCase())
        }),
        charms: state.charms,
        filteredCharms: state.charms,
        isLoading: false,
        error: null
      }
    case "filterCharms":
      return {
        builds: state.builds,
        weapons: state.weapons,
        filteredWeapons: state.filteredWeapons,
        armors: state.armors,
        filteredArmors: state.armors,
        charms: state.charms,
        filteredCharms: state.charms.filter(charm => {
          return charm.name.toLowerCase().includes(action.query.toLowerCase())
        }),
        isLoading: false,
        error: null
      }

  }
}