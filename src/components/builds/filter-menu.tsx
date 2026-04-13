import { color } from '@/data/color-scheme';
import { EQUIPMENT_ICONS } from '@/data/equipment_data';
import { Build, FilterItem } from '@/types/interfaces';
import { Checkbox } from 'expo-checkbox';
import { Dispatch, SetStateAction, useContext } from 'react';
import { Button, FlatList, Image, StyleSheet, View } from 'react-native';
import { HiddenBuildsContext } from '../../state/hidden-builds-context';

export function FilterMenu({ display, filterItems, setFilterItems, setState, defaultItems, builds }:
  {
    display: boolean,
    filterItems: FilterItem[],
    setFilterItems: Dispatch<SetStateAction<FilterItem[]>>,
    setState: Dispatch<SetStateAction<boolean>>,
    defaultItems: FilterItem[],
    builds: Build[]
  }) {
  const { hiddenBuilds, setHiddenBuilds } = useContext(HiddenBuildsContext)!;

  const renderItem = ({ item }: { item: FilterItem }) => (
    <View style={style.item}>
      <Checkbox onValueChange={() => {
        const foundItem: FilterItem = filterItems.find((filterItem) => filterItem.id === item.id)!
        foundItem.selected = !foundItem.selected

        const newHiddenBuilds: number[] = [...hiddenBuilds]

        if (foundItem.selected) {
          //removing items from the filter when it is unchecked
          builds.forEach((build) => {
            if (build.weapon.type === foundItem.type) {
              const index = newHiddenBuilds.findIndex((id) => id === build.id)
              if (index !== -1)
                newHiddenBuilds.splice(index, 1)
            }
          })
        }
        else {
          //hiding items if filtered
          builds.forEach((build) => {
            if (build.weapon.type === foundItem.type)
              newHiddenBuilds.push(build.id)
          })
        }

        setHiddenBuilds([...newHiddenBuilds])
      }}
        value={item.selected} />
      <Image source={EQUIPMENT_ICONS[item.type]} />
    </View>
  )

  return (
    <View style={[{ display: display ? "flex" : "none" }, style.menu]}>
      <FlatList
        data={filterItems}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
      />
      <View style={style.top}>
        <Button
          title="Reset"
          onPress={() => {
            const newFilters: FilterItem[] = [...defaultItems]
            newFilters.forEach((filter) => {
              filter.selected = true
            })
            setFilterItems([...newFilters])
            setHiddenBuilds([])
          }}
        />
        <Button
          title="Close"
          onPress={() => {
            setState(false)
          }}
        />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  menu: {
    position: "absolute",
    bottom: 100,
    backgroundColor: color.OverlayBG,
    width: "100%",
    alignItems: "center",
    padding: 10
  },

  item: {
    backgroundColor: "white",
    padding: 5,
    margin: 2,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  top: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5
  }
})