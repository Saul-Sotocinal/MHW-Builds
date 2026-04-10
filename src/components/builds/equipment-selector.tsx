import { color } from "@/data/color-scheme";
import { EQUIPMENT_ICONS } from "@/data/equipment_data";
import { useBuilds } from "@/state/builds-context";
import { Armor, Build, Charm, isArmor, isWeapon, Weapon } from "@/types/interfaces";
import { useSQLiteContext } from "expo-sqlite";
import { Dispatch, SetStateAction } from "react";
import { Button, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Title } from "../general/title";

export function EquipmentSelector({ build, props, setSelector }:
  {
    build: Build, props: EquipmentSelectorProps,
    setSelector: Dispatch<SetStateAction<EquipmentSelectorProps>>
  }) {
  const { state, update, fetchData } = useBuilds();
  const db = useSQLiteContext()
  const renderItem = ({ item }: { item: Weapon | Armor | Charm }) => {
    return (
      <Pressable style={style.item} onPress={() => {
        const updatedBuild = changeEquipment(item, item.type, build);

        setSelector({ isShown: false });
        update(updatedBuild)
      }}>
        <Image style={style.equipment_icon} source={EQUIPMENT_ICONS[item.type]} />
        <Text>{item.name}</Text>
      </Pressable>
    )
  }

  if (!props.isShown)
    return;

  return (
    <View style={[{ display: props.isShown ? "flex" : "none" }, style.menu]}>
      <Title title={`SELECT EQUIPMENT`} props={{ bgColor: "#67804418", decoColor: "#8cc381" }} />
      <FlatList
        data={props.type === 'weapon' ? state.weapons : props.type === 'armor' ? state.armors : state.charms}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()} />
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

  updatedBuild.charm = { ...newEquipment }
  return updatedBuild
}

export interface EquipmentSelectorProps {
  isShown: boolean,
  equipment?: Weapon | Armor | Charm,
  type?: 'weapon' | 'armor' | 'charm'
}

const style = StyleSheet.create({
  menu: {
    position: "absolute",
    alignSelf: "center",
    bottom: 40,
    backgroundColor: color.OverlayBG,
    alignItems: "center",
    width: 350,
    height: '80%',
    padding: 5
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