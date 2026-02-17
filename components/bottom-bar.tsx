import { StyleSheet, Text, View, FlatList, Image, Button, TextInput } from 'react-native';
import { build_list_styles, builds_display_styles, general_styles } from '../styles';
import { useState } from 'react';
import { FilterMenu } from './filter-menu';
import { Build } from '../interfaces';
import { SortMenu } from './sort-menu';

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

  return <View style={builds_display_styles.bottom_bar}>
    <View style={builds_display_styles.bottom_bar_buttons}>
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
