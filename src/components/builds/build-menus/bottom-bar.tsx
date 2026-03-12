import { BuildsContext } from '@/components/builds/builds-context';
import { DEFAULT_BUILD } from '@/data/equipment_data';
import { Build } from '@/types/interfaces';
import { useContext, useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { Label } from '../../general/button-label';
import { FilterMenu } from './filter-menu';
import { SortMenu } from './sort-menu';

export function BottomBar({ viewMode, setViewMode, flatListRef }: {
  viewMode: "list" | "card",
  setViewMode: React.Dispatch<React.SetStateAction<"list" | "card">>
  flatListRef: FlatList<Build> | null
}) {
  const [filter, setFilter] = useState(false)
  const [sort, setSort] = useState(false)
  const { builds, setBuilds } = useContext(BuildsContext)!;

  function changeDisplay() {
    if (viewMode === "list") {
      setViewMode("card")
    }
    else {
      setViewMode("list")
    }
  }

  function createBuild() {
    const newBuild = { ...DEFAULT_BUILD }
    
    if (builds.length > 0) {
      const sortedBuilds = builds.sort((a, b) => {
        if (parseInt(a.id) > parseInt(b.id)) return 1;
        if (parseInt(a.id) < parseInt(b.id)) return -1;
        return 0;
      });

      newBuild.id = (parseInt(sortedBuilds[builds.length - 1].id) + 1).toString()
    }

    builds.push(newBuild)
    setBuilds([...builds])
    flatListRef!.scrollToEnd()
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

      <FilterMenu display={filter} />
      <SortMenu display={sort} />
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