import { AVAILABLE_ARMORS, AVAILABLE_WEAPONS, EQUIPMENT_ICONS } from "@/data/equipment_data";
import { useBuilds } from "@/state/builds-context";
import { Armor, Build, Charm, isArmor, isWeapon, Weapon } from "@/types/interfaces";
import { Dispatch, SetStateAction } from "react";
import { Button, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

export function EquipmentSelector({ build, props, setSelector }:
  {
    build: Build, props: EquipmentSelectorProps,
    setSelector: Dispatch<SetStateAction<EquipmentSelectorProps>>
  }) {
  const { state, refresh, add, update, remove } = useBuilds();
  const renderItem = ({ item }: { item: Weapon | Armor }) => (
    <Pressable style={style.item} onPress={() => {
      const updatedBuild = changeEquipment(item, item.type, build);

      setSelector({ isShown: false });
      update(updatedBuild)
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

function changeEquipment(newEquipment: Armor | Weapon | Charm, type: string, build: Build): Build {
  const updatedBuild = { ...build }

  if (isWeapon(newEquipment)) {
    updatedBuild.weapon = { ...newEquipment };
    return updatedBuild
  }

  if (isArmor(newEquipment)) {
    switch (newEquipment.type) {
      case "head":
        updatedBuild.head = { ...newEquipment }
        break;
      case "chest":
        updatedBuild.chest = { ...newEquipment }
        break;
      case "gloves":
        updatedBuild.gloves = { ...newEquipment }
        break;
      case "waist":
        updatedBuild.waist = { ...newEquipment }
        break;
      case "legs":
        updatedBuild.legs = { ...newEquipment }
        break;
    }
    return updatedBuild
  }

  updatedBuild.charm = {...newEquipment}
  return updatedBuild
}

interface EquipmentSelectorProps {
  isShown: boolean,
  equipment?: Weapon | Armor | Charm
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