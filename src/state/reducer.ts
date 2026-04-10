import { Armor, Build, Charm, Weapon } from "@/types/interfaces";

export type BuildsState = {
  builds: Build[];
  weapons: Weapon[];
  armors: Armor[];
  charms: Charm[];
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
  { action: 'fetchError', errorMsg: string }

export function buildsReducer(state: BuildsState, action: BuildsAction): BuildsState {
  switch (action.action) {
    case 'loadStart':
    case 'weaponFetchStart':
    case 'armorFetchStart':
    case 'charmFetchStart':
      return {
        builds: state.builds,
        weapons: state.weapons,
        armors: state.armors,
        charms: state.charms,
        isLoading: true,
        error: null
      }
    case "loadSuccess":
      return {
        builds: action.builds,
        weapons: state.weapons,
        armors: state.armors,
        charms: state.charms,
        isLoading: false,
        error: null
      }
    case "weaponFetchSuccess":
      return {
        builds: state.builds,
        weapons: action.payload,
        armors: state.armors,
        charms: state.charms,
        isLoading: false,
        error: null
      }
    case "armorFetchSuccess":
      return {
        builds: state.builds,
        weapons: state.weapons,
        armors: action.payload,
        charms: state.charms,
        isLoading: false,
        error: null
      }
    case "charmFetchSuccess":
      return {
        builds: state.builds,
        weapons: state.weapons,
        armors: state.armors,
        charms: action.payload,
        isLoading: false,
        error: null
      }
    case "loadError":
    case 'fetchError':
      return {
        builds: [],
        weapons: state.weapons,
        armors: state.armors,
        charms: state.charms,
        isLoading: false,
        error: action.errorMsg
      }
    case "addSuccess":
      return {
        builds: [...state.builds, action.payload],
        weapons: state.weapons,
        armors: state.armors,
        charms: state.charms,
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
        armors: state.armors,
        charms: state.charms,
        isLoading: false,
        error: null
      }
    case "removeSuccess":
      return {
        builds: state.builds.filter((build) => build.id !== action.id),
        weapons: state.weapons,
        armors: state.armors,
        charms: state.charms,
        isLoading: false,
        error: null
      }
  }
}