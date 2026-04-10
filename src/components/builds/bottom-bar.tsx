import { DEFAULT_BUILD_IDS } from '@/data/equipment_data';
import { getArmor, getCharm, getWeapon } from '@/db/repository';
import { useBuilds } from '@/state/builds-context';
import { Build, FilterItem } from '@/types/interfaces';
import { useSQLiteContext } from 'expo-sqlite';
import { useContext, useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { HiddenBuildsContext } from '../../state/hidden-builds-context';
import { Label } from '../general/button-label';
import { FilterMenu } from './filter-menu';
import { SortMenu } from './sort-menu';

const DEFAULT_ITEMS: FilterItem[] = [
  { id: '1', type: 'great-sword', selected: true },
  { id: '2', type: 'long-sword', selected: true },
  { id: '3', type: 'sword-and-shield', selected: true },
  { id: '4', type: 'dual-blades', selected: true },
  { id: '5', type: 'hammer', selected: true },
  { id: '6', type: 'hunting-horn', selected: true },
  { id: '7', type: 'lance', selected: true },
  { id: '8', type: 'gunlance', selected: true },
  { id: '9', type: 'switch-axe', selected: true },
  { id: '10', type: 'charge-blade', selected: true },
  { id: '11', type: 'insect-glaive', selected: true },
  { id: '12', type: 'light-bowgun', selected: true },
  { id: '13', type: 'heavy-bowgun', selected: true },
  { id: '14', type: 'bow', selected: true }
]

export function BottomBar({ viewMode, setViewMode, flatListRef }: {
  viewMode: "list" | "card",
  setViewMode: React.Dispatch<React.SetStateAction<"list" | "card">>
  flatListRef: FlatList<Build> | null
}) {
  const [filter, setFilter] = useState(false)
  const [sort, setSort] = useState(false)
  const { state, refresh, add } = useBuilds();
  const [items, setItems] = useState<FilterItem[]>(DEFAULT_ITEMS)
  const { hiddenBuilds, setHiddenBuilds } = useContext(HiddenBuildsContext)!;
  const [sortOption, setSortOption] = useState<"name" | "damage" | "defense" | "none">("none");
  const db = useSQLiteContext();

  function changeDisplay() {
    if (viewMode === "list") {
      setViewMode("card")
    }
    else {
      setViewMode("list")
    }
  }

  async function createBuild() {
    // all new builds take from the default build
    const newBuild: Build = {
      id: 0,
      name: "New Build",
      weapon: (await getWeapon(db, DEFAULT_BUILD_IDS.weapon_id, false))!,
      head: (await getArmor(db, DEFAULT_BUILD_IDS.head_id, false))!,
      chest: (await getArmor(db, DEFAULT_BUILD_IDS.chest_id, false))!,
      gloves: (await getArmor(db, DEFAULT_BUILD_IDS.gloves_id, false))!,
      waist: (await getArmor(db, DEFAULT_BUILD_IDS.waist_id, false))!,
      legs: (await getArmor(db, DEFAULT_BUILD_IDS.legs_id, false))!,
      charm: (await getCharm(db, DEFAULT_BUILD_IDS.charm_id, false))!
    }

    // if (state.builds.length > 0) {
    //   // sorting to get the highest id
    //   const sortedBuilds = state.builds.sort((a, b) => {
    //     if (a.id > b.id) return 1;
    //     if (a.id < b.id) return -1;
    //     return 0;
    //   });

    //   // new ids are the highest id numbers + 1
    //   newBuild.id = sortedBuilds[state.builds.length - 1].id + 1

    //   // Changing the weapon of the new build from the deafult if it is filtered
    //   // defaults to sword and shield if all weapons are filtered out
    //   for (let i = 0; i < DEFAULT_ITEMS.length; i++) {
    //     if (items[i].selected) {
    //       newBuild.weapon = { ...AVAILABLE_WEAPONS.find((weapon) => weapon.type === items[i].type)! }
    //       break
    //     }
    //     if (i === DEFAULT_ITEMS.length - 1)
    //       setHiddenBuilds([...hiddenBuilds, newBuild.id])
    //   }
    // }

    //  sorting after adding a build to ensure it is sorted
    add(newBuild)
    refresh(sortOption)

    const index: number = state.builds.findIndex((build) => build.id === newBuild.id) - 1

    //scrolling to make sure new build is visible
    // flatListRef!.scrollToIndex({ index: index })
  }

  function showFilters() {
    setFilter(!filter)
    setSort(false)
  }

  function showSorting() {
    setSort(!sort)
    setFilter(false)
  }

  return <View style={style.bottom_bar}>
    <View style={style.bottom_bar_buttons}>
      <View style={style.row}>
        <Pressable onPress={showSorting}><Label title='SORT ' color='Green' /></Pressable>
        <Pressable onPress={showFilters}><Label title='FILTER ' color='Green' /></Pressable>
      </View>

      <View style={style.row}>
        <Pressable onPress={createBuild}><Label title='CREATE ' color='Green' /></Pressable>
        <Pressable onPress={changeDisplay}><Label title='DISPLAY ' color='Green' /></Pressable>
      </View>

      <FilterMenu display={filter} filterItems={items} setFilterItems={setItems} defaultItems={DEFAULT_ITEMS} builds={state.builds} />
      <SortMenu display={sort} setSortOption={setSortOption} />
    </View>
  </View>
}

interface BottomBarProps {
  viewMode: "list" | "card",
  setViewMode: React.Dispatch<React.SetStateAction<"list" | "card">>
}

const style = StyleSheet.create({
  bottom_bar: {
    margin: 20
  },

  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },

  bottom_bar_buttons: {
    display: "flex",
    gap: 10
  }
});