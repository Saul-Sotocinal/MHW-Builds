/**
 * How to use the useContext react hook for passing and modifying its value 
 * by stack overflow user Adam Jenkins
 * https://stackoverflow.com/users/954940/adam-jenkins
 * 
 * Question:
 * https://stackoverflow.com/questions/69247544/how-to-properly-change-react-context-value
 */

import { addBuild, deleteBuild, getBuilds, isClosedResourceSqliteError, updateBuild } from "@/db/repository";
import { Build } from "@/types/interfaces";
import { useSQLiteContext } from "expo-sqlite";
import { createContext, ReactNode, useContext, useEffect, useReducer } from "react";
import { buildsReducer, BuildsState } from "./reducer";

const initialState: BuildsState = { builds: [], isLoading: true, error: null }

interface BuildContextType {
  state: BuildsState,
  refresh: (sortOption?: 'name' | 'damage' | 'defense' | 'none') => Promise<void>,
  add: (build: Build) => Promise<void>,
  update: (build: Build) => Promise<void>,
  remove: (id: number) => Promise<void>
}

export const BuildsContext = createContext<BuildContextType | null>(null);

export function BuildsProvider({ children }: { children: ReactNode }) {
  const db = useSQLiteContext()
  const [state, dispatch] = useReducer(buildsReducer, initialState)
  // const [sort, setSort] = useState<'none' | 'name' | 'damage' | 'defense'>('none')

  async function refresh(sortOption: 'name' | 'damage' | 'defense' | 'none' = 'none') {
    dispatch({ action: 'loadStart', builds: state.builds })

    try {
      const builds = await getBuilds(db, sortOption)

      dispatch({ action: 'loadSuccess', builds: builds })
    } catch (e) {
      if (!isClosedResourceSqliteError(e)) {
        console.error(`DB Error: ${e}`)
        dispatch({ action: 'loadError', errorMsg: 'Failed to fetch builds from DB.'})
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
        dispatch({ action: 'loadError', errorMsg: 'Failed to add new build to DB.'})
      }
    }
  }

  async function update(newBuild: Build) {
    try {
      const updatedBuild = await updateBuild(db, newBuild)
      dispatch({action: 'updateSuccess', id: updatedBuild.id, payload: updatedBuild })
    } catch (e) {
      if (!isClosedResourceSqliteError(e)) {
        console.error(`DB Error: ${e}`)
        dispatch({ action: 'loadError', errorMsg: 'Failed to update build from DB.'})
      }
    }
  }

  async function remove(id: number) {
    try {
      dispatch({ action: 'removeSuccess', id: await deleteBuild(db, id) })
    } catch (e) {
      if (!isClosedResourceSqliteError(e)) {
        console.error(`DB Error: ${e}`)
        dispatch({ action: 'loadError', errorMsg: 'Failed to delete build from DB.'})
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
      remove: remove
    }}>
      {children}
    </BuildsContext.Provider>
  )
}

export function useBuilds(): BuildContextType {
  const context =  useContext(BuildsContext)

  if (context === null) throw new Error("Builds context is null.")
  return context
}