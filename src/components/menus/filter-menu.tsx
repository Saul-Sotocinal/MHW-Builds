import { BUILDS_TEMPLATE, EQUIPMENT_ICONS } from '@/data/data';
import { Build } from '@/types/interfaces';
import { Checkbox } from 'expo-checkbox';
import { useState } from 'react';
import { Button, FlatList, Image, StyleSheet, View } from 'react-native';

const INITIAL_ITEMS: FilterItem[] = [
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

export function FilterMenu({ display, builds, setBuilds }:
  { display: boolean, builds: Build[], setBuilds: React.Dispatch<React.SetStateAction<Build[]>> }) {
  const [items, setItems] = useState<FilterItem[]>(INITIAL_ITEMS)

  const renderItem = ({ item }: { item: FilterItem }) => (
    <View style={style.item}>
      <Checkbox onValueChange={() => {
        setItems(items.map((x) => {
          if (x.id !== item.id) {
            return x;
          }

          if (x.selected) {
            let newBuilds: Build[] = builds
              .filter((x) => {
                if (item.type !== x.weapon.type) return x;
              });

            setBuilds(newBuilds);
          } else {
            let newBuilds = [
              ...builds,
              ...BUILDS_TEMPLATE.filter((x) => x.weapon.type === item.type)
            ].sort((a, b) => {
              if (parseInt(a.id) > parseInt(b.id))
                return 1
              else if (parseInt(a.id) < parseInt(b.id))
                return -1

              return 0
            })

            setBuilds(newBuilds)
          }

          return { ...x, selected: !x.selected };
        }))
      }} value={item.selected} />
      <Image source={EQUIPMENT_ICONS[item.type]} />
    </View>
  )

  return (
    <View style={[{ display: display ? "flex" : "none" }, style.menu]}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}></FlatList>
      <Button
        title="Reset"
        onPress={() => {
          setItems([...INITIAL_ITEMS]);
          setBuilds([...BUILDS_TEMPLATE]);
        }}
      />
    </View>
  );
}

interface FilterItem {
  id: string,
  type: string,
  selected: boolean
}

const style = StyleSheet.create({
  menu: {
    position: "absolute",
    bottom: 40,
    backgroundColor: 'rgba(34, 34, 34, 0.8)',
    width: "100%",
    alignItems: "center"
  },

  item: {
    backgroundColor: "white",
    padding: 5,
    margin: 2,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    width: "100%",
  }
})