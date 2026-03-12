import { BuildsContext } from '@/components/builds/builds-context';
import { AVAILABLE_WEAPONS, DEFAULT_BUILD } from '@/data/equipment_data';
import { Build, FilterItem } from '@/types/interfaces';
import { useContext, useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { Label } from '../general/button-label';
import { FilterMenu } from './filter-menu';
import { HiddenBuildsContext } from './hidden-builds-context';
import { sortByDamage, sortByDefense, sortByName, SortMenu } from './sort-menu';

const DEFAULT_ITEMS: FilterItem[] = [
  { id: '1', type: 'greatsword', selected: true },
  { id: '2', type: 'longsword', selected: true },
  { id: '3', type: 'sword_and_shield', selected: true },
  { id: '4', type: 'dual_blades', selected: true },
  { id: '5', type: 'hammer', selected: true },
  { id: '6', type: 'hunting_horn', selected: true },
  { id: '7', type: 'lance', selected: true },
  { id: '8', type: 'gunlance', selected: true },
  { id: '9', type: 'switch_axe', selected: true },
  { id: '10', type: 'charge_blade', selected: true },
  { id: '11', type: 'insect_glaive', selected: true },
  { id: '12', type: 'light_bowgun', selected: true },
  { id: '13', type: 'heavy_bowgun', selected: true },
  { id: '14', type: 'bow', selected: true }
]

export function BottomBar({ viewMode, setViewMode, flatListRef }: {
  viewMode: "list" | "card",
  setViewMode: React.Dispatch<React.SetStateAction<"list" | "card">>
  flatListRef: FlatList<Build> | null
}) {
  const [filter, setFilter] = useState(false)
  const [sort, setSort] = useState(false)
  const { builds, setBuilds } = useContext(BuildsContext)!;
  const [items, setItems] = useState<FilterItem[]>(DEFAULT_ITEMS)
  const { hiddenBuilds, setHiddenBuilds } = useContext(HiddenBuildsContext)!;
  const [sortOption, setSortOption] = useState<"name" | "damage" | "defense" | "none">("none");

  function changeDisplay() {
    if (viewMode === "list") {
      setViewMode("card")
    }
    else {
      setViewMode("list")
    }
  }

  function createBuild() {
    // all new builds take from the default build
    const newBuild = { ...DEFAULT_BUILD }

    if (builds.length > 0) {
      // sorting to get the highest id
      const sortedBuilds = builds.sort((a, b) => {
        if (parseInt(a.id) > parseInt(b.id)) return 1;
        if (parseInt(a.id) < parseInt(b.id)) return -1;
        return 0;
      });

      // new ids are the highest id numbers + 1
      newBuild.id = (parseInt(sortedBuilds[builds.length - 1].id) + 1).toString()

      // Changing the weapon of the new build from the deafult if it is filtered
      // defaults to sword and shield if all weapons are filtered out
      for (let i = 0; i < DEFAULT_ITEMS.length; i++) {
        if (items[i].selected) {
          newBuild.weapon = { ...AVAILABLE_WEAPONS.find((weapon) => weapon.type === items[i].type)! }
          break
        }
        if (i === DEFAULT_ITEMS.length - 1)
          setHiddenBuilds([...hiddenBuilds, newBuild.id])
      }
    }

    //  sorting after adding a build to ensure it is sorted
    builds.push(newBuild)
    switch (sortOption) {
      case 'name':
        setBuilds([...sortByName(builds)])
        break;

      case 'damage':
        setBuilds([...sortByDamage(builds)])
        break;

      case 'defense':
        setBuilds([...sortByDefense(builds)])
        break;

      case 'none':
        setBuilds([...builds])
        break;
    }
    const index: number = builds.findIndex((build) => build.id === newBuild.id) - 1

    //scrolling to make sure new build is visible
    flatListRef!.scrollToIndex({ index: index })
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

      <FilterMenu display={filter} filterItems={items} setFilterItems={setItems} defaultItems={DEFAULT_ITEMS} builds={builds} />
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