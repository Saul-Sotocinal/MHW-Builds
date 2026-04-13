import { color } from "@/data/color-scheme";
import { EQUIPMENT_ICONS } from "@/data/equipment_data";
import { getNoneArmorByType, getNoneCharm, getNoneWeapon } from "@/db/repository";
import { useBuilds } from "@/state/builds-context";
import { Armor, ArmorType, Build, Charm, isArmor, isWeapon, Weapon } from "@/types/interfaces";
import { useNetInfo } from '@react-native-community/netinfo';
import { useSQLiteContext } from "expo-sqlite";
import { Dispatch, SetStateAction, useState } from "react";
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { TextStroke } from "../general/text-stroke";
import { Title } from "../general/title";

export function EquipmentSelector({ build, props, setSelector }:
  {
    build: Build, props: EquipmentSelectorProps,
    setSelector: Dispatch<SetStateAction<EquipmentSelectorProps>>
  }) {
  const { state, update, filterEquipment } = useBuilds();
  const [filter, setFilter] = useState('')
  const db = useSQLiteContext()
  const netInfo = useNetInfo()

  const renderItem = ({ item }: { item: Weapon | Armor | Charm }) => {
    return (
      <Pressable style={style.item} onPress={() => {
        const updatedBuild = changeEquipment(item, item.type, build);

        setSelector({ isShown: false });
        update(updatedBuild)
      }}>
        <Image style={style.equipment_icon} source={EQUIPMENT_ICONS[item.type]} />
        <TextStroke stroke={1} color='black'>
          <Text style={style.button_text}>{item.name} </Text>
        </TextStroke>
      </Pressable>
    )
  }

  if (!props.isShown)
    return;

  return (
    <View style={[{ display: props.isShown ? "flex" : "none" }, style.menu]}>
      <Title title={`SELECT EQUIPMENT`} props={{ bgColor: color.OverlayBG, decoColor: "#8db74e" }} />

      {!netInfo.isConnected ?
        <Text style={style.connectivity_text}>
          Device is not connected to the internet. Only previously viewed equipment will be shown!
        </Text> :
        null
      }

      {state.isLoading ? <ActivityIndicator /> :
        <FlatList
          data={
            props.type === 'weapon' ? state.filteredWeapons :
              props.type === 'armor' ? state.filteredArmors :
                state.filteredCharms
          }
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      }

      <TextInput
        numberOfLines={1}
        value={filter}
        placeholder="SEARCH 🔍"
        placeholderTextColor={'white'}
        style={style.search}
        onChangeText={text => {
          setFilter(text)
          filterEquipment(text, props.type!)
        }}
      />

      <Pressable style={style.button} onPress={async () => {
        let item: Weapon | Armor | Charm;

        if (props.type === 'weapon') {
          item = await getNoneWeapon(db)
        } else if (props.type === 'charm') {
          item = await getNoneCharm(db)
        } else {
          item = await getNoneArmorByType(db, props.equipment?.type as ArmorType)
        }

        const updatedBuild = changeEquipment(item, item.type, build);

        setSelector({ isShown: false });
        update(updatedBuild)
      }}>
        <TextStroke stroke={1} color='black'>
          <Text style={style.remove_button_text}>REMOVE</Text>
        </TextStroke>
      </Pressable>

      <Pressable style={style.button} onPress={() => {
        setSelector({ isShown: false });
      }}>
        <TextStroke stroke={1} color='black'>
          <Text style={style.button_text}>CLOSE</Text>
        </TextStroke>
      </Pressable>
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
    padding: 5,
    gap: 5,
  },

  item: {
    backgroundColor: color.OverlayBG,
    padding: 5,
    margin: 2,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    width: "100%",
  },

  button_text: {
    color: 'white',
    fontSize: 15
  },

  remove_button_text: {
    color: '#e03535',
    fontSize: 15,
    fontWeight: 600
  },

  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.OverButton,
    width: '80%',
    height: 30
  },

  ranks: {
    display: 'flex',
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between'
  },

  rank_button: {
    backgroundColor: color.OverButton,
    width: '30%',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },

  connectivity_text: {
    textAlign: 'center',
    color: '#ff7676',
    fontSize: 15
  },

  search: {
    color: 'white',
    borderColor: color.OverButtonAccent,
    backgroundColor: color.OverlayBG,
    borderWidth: 1,
    width: '80%'
  },

  equipment_icon: {
    height: 30,
    width: 30,
  },
})