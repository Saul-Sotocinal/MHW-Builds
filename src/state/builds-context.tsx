import { addArmor, addBuild, addCharm, addWeapon, deleteBuild, getArmorsByType, getBuilds, getCharms, getWeapons, isClosedResourceSqliteError, updateBuild } from "@/db/repository";
import { fetchArmorData, fetchCharmsData, fetchWeaponData } from "@/services/api";
import { Armor, Build, Charm, isArmor, Weapon } from "@/types/interfaces";
import { useSQLiteContext } from "expo-sqlite";
import { createContext, ReactNode, useContext, useEffect, useReducer } from "react";
import { buildsReducer, BuildsState } from "./reducer";

const initialState: BuildsState = { 
  builds: [], 
  weapons: [], 
  filteredWeapons: [], 
  armors: [], 
  filteredArmors: [], 
  charms: [], 
  filteredCharms: [], 
  isLoading: true, 
  error: null 
}

interface BuildContextType {
  state: BuildsState,
  refresh: (sortOption?: 'name' | 'damage' | 'defense' | 'none') => Promise<void>,
  add: (build: Build) => Promise<void>,
  update: (build: Build) => Promise<void>,
  remove: (id: number) => Promise<void>,
  filterEquipment: (query: string, type: 'weapon' | 'armor' | 'charm') => void,
  fetchData: (type: 'weapon' | 'armor' | 'charm', equipment?: Weapon | Armor | Charm) => Promise<void>
}

export const BuildsContext = createContext<BuildContextType | null>(null);

export function BuildsProvider({ children }: { children: ReactNode }) {
  const db = useSQLiteContext()
  const [state, dispatch] = useReducer(buildsReducer, initialState)

  async function refresh(sortOption: 'name' | 'damage' | 'defense' | 'none' = 'none') {
    dispatch({ action: 'loadStart', builds: state.builds })

    try {
      const builds = await getBuilds(db, sortOption)

      dispatch({ action: 'loadSuccess', builds: builds })
    } catch (e) {
      if (!isClosedResourceSqliteError(e)) {
        console.error(`DB Error: ${e}`)
        dispatch({ action: 'loadError', errorMsg: 'Failed to fetch builds from DB.' })
      }
    }
  }

  async function add(build: Build) {
    try {
      const id = await addBuild(db, build.name)
      build.id = id

      dispatch({ action: 'addSuccess', payload: build })
    } catch (e) {
      if (!isClosedResourceSqliteError(e)) {
        console.error(`DB Error: ${e}`)
        dispatch({ action: 'loadError', errorMsg: 'Failed to add new build to DB.' })
      }
    }
  }

  async function update(newBuild: Build) {
    try {
      const updatedBuild = await updateBuild(db, newBuild)
      dispatch({ action: 'updateSuccess', id: updatedBuild.id, payload: updatedBuild })
    } catch (e) {
      if (!isClosedResourceSqliteError(e)) {
        console.error(`DB Error: ${e}`)
        dispatch({ action: 'loadError', errorMsg: 'Failed to update build from DB.' })
      }
    }
  }

  async function remove(id: number) {
    try {
      dispatch({ action: 'removeSuccess', id: await deleteBuild(db, id) })
    } catch (e) {
      if (!isClosedResourceSqliteError(e)) {
        console.error(`DB Error: ${e}`)
        dispatch({ action: 'loadError', errorMsg: 'Failed to delete build from DB.' })
      }
    }
  }

  function filter(query: string, type: 'weapon' | 'armor' | 'charm') {
    if (type === 'weapon')
      dispatch({action: 'filterWeapons', query: query})
    else if (type === 'armor')
      dispatch({action: 'filterArmors', query: query})
    else
      dispatch({action: 'filterCharms', query: query})
  }

  async function fetchData(type: 'weapon' | 'armor' | 'charm', equipment?: Weapon | Armor | Charm) {
    try {
      switch (type) {
        case "weapon":
          dispatch({ action: 'weaponFetchStart', payload: [] })

          if (state.weapons.length !== 0) {
            console.log('✓ Cache hit! Using cached data.');
            dispatch({ action: 'weaponFetchSuccess', payload: state.weapons })
            break
          }

          let weapons = await getWeapons(db)

          if (weapons.length !== 0) {
            console.log('✗ Cache miss. Fetching from DB...');
            dispatch({ action: 'weaponFetchSuccess', payload: weapons })
            break
          }

          console.log('✗ Cache miss. Fetching from API...');
          weapons = await fetchWeaponData()
          weapons.forEach(async (weapon) => {
            addWeapon(db, weapon)
          })
          dispatch({ action: 'weaponFetchSuccess', payload: weapons })
          break
        case "armor":
          dispatch({ action: 'armorFetchStart', payload: [] })

          if (!equipment)
            throw new Error('Pass in armor object when calling fetchData with armor type.')

          if (!isArmor(equipment))
            throw new Error('Cannot pass weapon equipment into armor selector.')

          if (state.armors.length !== 0) {
            if (state.armors[0].type === equipment.type) {
              console.log('✓ Cache hit! Using cached data.');
              dispatch({ action: 'armorFetchSuccess', payload: state.armors })
              break
            }
          }

          let armors = await getArmorsByType(db, equipment.type)

          if (armors.length !== 0) {
            console.log('✗ Cache miss. Fetching from DB...');
            dispatch({ action: 'armorFetchSuccess', payload: armors })
            break
          }

          console.log('✗ Cache miss. Fetching from API...');
          armors = await fetchArmorData()
          armors.forEach(async (armor) => {
            addArmor(db, armor)
          })
          armors = armors.filter((armor) => armor.type === equipment.type)
          dispatch({ action: 'armorFetchSuccess', payload: armors })
          break
        case "charm":
          dispatch({ action: 'charmFetchStart', payload: [] })

          if (state.charms.length !== 0) {
            console.log('✓ Cache hit! Using cached data.');
            dispatch({ action: 'charmFetchSuccess', payload: state.charms })
            break
          }

          let charms = await getCharms(db)

          if (charms.length !== 0) {
            console.log('✗ Cache miss. Fetching from DB...');
            dispatch({ action: 'charmFetchSuccess', payload: charms })
            break
          }

          console.log('✗ Cache miss. Fetching from API...');
          charms = await fetchCharmsData()
          charms.forEach(async (charm) => {
            addCharm(db, charm)
          })
          dispatch({ action: 'charmFetchSuccess', payload: charms })
          break
      }
    } catch (e) {
      if (!isClosedResourceSqliteError(e)) {
        console.error(`DB Error: ${e}`)
        dispatch({ action: 'fetchError', errorMsg: 'Failed to fetch equipment data.' })
      }
    }
  }

  useEffect(() => {
    async function init() {
      refresh()
    }
    void init()
  }, [])

  return (
    <BuildsContext.Provider value={{
      state: state,
      refresh: refresh,
      add: add,
      update: update,
      remove: remove,
      filterEquipment: filter,
      fetchData: fetchData
    }}>
      {children}
    </BuildsContext.Provider>
  )
}

export function useBuilds(): BuildContextType {
  const context = useContext(BuildsContext)

  if (context === null) throw new Error("Builds context is null.")
  return context
}