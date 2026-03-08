import { StyleSheet, View, Button, TextInput } from 'react-native';
import { useState } from 'react';
import { FilterMenu } from '../menus/filter-menu';
import { Build } from '../../interfaces';
import { SortMenu } from '../menus/sort-menu';

export function BottomBar({ props }: { props: BottomBarProps }) {
  const [filter, setFilter] = useState(false)
  const [sort, setSort] = useState(false)

  function changeDisplay() {
    if (props.viewMode === "list") {
      props.setViewMode("card")
    }
    else {
      props.setViewMode("list")
    }
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
      <Button title='SORT' onPress={showSorting}></Button>
      <Button title='FILTER' onPress={showFilters}></Button>
      <Button title='DISPLAY' onPress={changeDisplay}></Button>

      <FilterMenu display={filter} builds={props.builds} setBuilds={props.setBuilds}/>
      <SortMenu display={sort} builds={props.builds} setBuilds={props.setBuilds}/>
    </View>

    <TextInput placeholder="Search Name (will be implemented later)" />
  </View>
}

interface BottomBarProps {
  viewMode: "list" | "card",
  setViewMode: React.Dispatch<React.SetStateAction<"list" | "card">>,
  builds: Build[], 
  setBuilds: React.Dispatch<React.SetStateAction<Build[]>> 
}

const style = StyleSheet.create({
  bottom_bar: {
    margin: 20
  },

  bottom_bar_buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 50,
    marginRight: 50
  }
});