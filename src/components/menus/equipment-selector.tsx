import { BuildsContext } from "@/data/builds-context";
import { AVAILABLE_ARMORS, AVAILABLE_WEAPONS, EQUIPMENT_ICONS } from "@/data/data";
import { Armor, Build, isWeapon, Weapon } from "@/types/interfaces";
import { Dispatch, SetStateAction, useContext } from "react";
import { Button, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

export function EquipmentSelector({ build, props, setSelector }:
  {
    build: Build, props: EquipmentSelectorProps,
    setSelector: Dispatch<SetStateAction<EquipmentSelectorProps>>
  }) {
  const {builds, setBuilds} = useContext(BuildsContext)!;
  const renderItem = ({ item }: { item: Weapon | Armor }) => (
    <Pressable style={style.item} onPress={() => {
      changeEquipment(item, item.type, build);

      setSelector({isShown: false});
      setBuilds([...builds]);
    }}>
      <Image style={style.equipment_icon} source={EQUIPMENT_ICONS[item.type]} />
      <Text>{item.name}</Text>
    </Pressable>
  )

  if (!props.isShown)
    return;

  let items;
  if (isWeapon(props.equipment!))
    items = AVAILABLE_WEAPONS
  else
    items = AVAILABLE_ARMORS.filter((a) => a.type === props.equipment?.type)

  return (
    <View style={[{ display: props.isShown ? "flex" : "none" }, style.menu]}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()} />
      <Button
        title="Close"
        onPress={() => {
          setSelector({ isShown: false });
        }}
      />
    </View>
  );
}

function changeEquipment(newEquipment: Armor | Weapon, type: string, build: Build) {
  if (isWeapon(newEquipment)) {
    build.weapon = {...newEquipment};
    return;
  }

  switch (newEquipment.type) {
    case "helm":
      build.helm = {...newEquipment}
      break;
    case "chest":
      build.chest = {...newEquipment}
      break;
    case "gloves":
      build.gloves = {...newEquipment}
      break;
    case "waist":
      build.waist = {...newEquipment}
      break;
    case "legs":
      build.legs = {...newEquipment}
      break;
    case "talisman":
      build.talisman = {...newEquipment}
      break;
  }
}

interface EquipmentSelectorProps {
  isShown: boolean,
  equipment?: Weapon | Armor
}

const style = StyleSheet.create({
  menu: {
    position: "absolute",
    alignSelf: "center",
    bottom: 40,
    backgroundColor: 'rgba(34, 34, 34, 0.8)',
    alignItems: "center",
    width: 250,
    height: 300,
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
    width: "100%",
  },

  equipment_icon: {
    height: 30,
    width: 30,
  },
})