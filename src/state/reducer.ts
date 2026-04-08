import { Build } from "@/types/interfaces";

export type BuildsState = {
  builds: Build[];
  isLoading: boolean;
  error: string | null
}

export type BuildsAction = 
  { action: 'loadStart' | 'loadSuccess', builds: Build[] } | 
  { action: 'loadError', errorMsg: string} |
  { action: 'addSuccess', payload: Build } |
  { action: 'updateSuccess', id: number, payload: Build } |
  { action: 'removeSuccess', id: number}

export function buildsReducer(state: BuildsState, action: BuildsAction) : BuildsState {
  switch (action.action) {
    case 'loadStart':
      return {
        builds: state.builds,
        isLoading: true,
        error: null
      }
    case "loadSuccess":
      return {
        builds: action.builds,
        isLoading: false,
        error: null
      }
    case "loadError":
      return {
        builds: [],
        isLoading: false,
        error: action.errorMsg
      }
    case "addSuccess":
      return {
        builds: [...state.builds, action.payload],
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
        isLoading: false,
        error: null
      }
    case "removeSuccess":
      return {
        builds: state.builds.filter((build) => build.id !== action.id),
        isLoading: false,
        error: null
      }
  }
}