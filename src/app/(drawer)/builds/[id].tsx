import { EquipmentIcon } from "@/components/decorative/equipment-icon";
import { LineMark } from "@/components/decorative/line-mark";
import { Title } from "@/components/decorative/title";
import { EquipmentSelector } from "@/components/menus/equipment-selector";
import { BuildsContext } from "@/data/builds-context";
import { color } from "@/data/color-scheme";
import { ELEMENT_ICONS } from "@/data/data";
import { Armor, isWeapon, Weapon } from "@/types/interfaces";
import { useLocalSearchParams } from "expo-router";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { Image, ImageBackground, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";


export default function BuildDetailScreen() {
  const { builds, setBuilds } = useContext(BuildsContext)!;
  const [selector, setSelector] =
    useState<{ isShown: boolean, equipment?: Weapon | Armor }>({ isShown: false });

  const BACKGROUND_IMAGE = require('@assets/ui_elements/page_bg.png')

  const { id } = useLocalSearchParams<{ id: string }>();
  const build = builds.find((b) => b.id === id);

  if (!build) {
    return (
      <ImageBackground source={BACKGROUND_IMAGE} style={style.background} resizeMode='stretch'>
        <SafeAreaProvider>
          <SafeAreaView style={style.safe_area}>
            <Text>Not Found</Text>
          </SafeAreaView>
        </SafeAreaProvider>
      </ImageBackground>
    );
  }

  const buildIndex = builds.indexOf(build);
  return (
    <ImageBackground source={BACKGROUND_IMAGE} style={style.background} resizeMode='stretch'>
      <SafeAreaProvider>
        <SafeAreaView style={style.safe_area}>
          <View>
            <ScrollView>
              <View style={style.build}>

                <Title title={build.name} renameId={build.id} props={{width:130, bgColor: color.RedCard, decoColor: color.RedDeco}} />

                <View>
                  <EquipmentCard equipment={build.weapon} setSelector={setSelector} />
                  <EquipmentCard equipment={build.helm} setSelector={setSelector} />
                  <EquipmentCard equipment={build.chest} setSelector={setSelector} />
                  <EquipmentCard equipment={build.gloves} setSelector={setSelector} />
                  <EquipmentCard equipment={build.waist} setSelector={setSelector} />
                  <EquipmentCard equipment={build.legs} setSelector={setSelector} />
                  <EquipmentCard equipment={build.talisman} setSelector={setSelector} />
                </View>

                <View style={style.stats}>
                  <View style={style.attack}>
                    <Text style={style.stats_details}>{build.weapon.damage} ATK</Text>
                    <Image source={ELEMENT_ICONS[build.weapon.element]} style={style.element} />
                  </View>
                  <Text style={style.stats_details}>{
                    build.helm.defense +
                    build.chest.defense +
                    build.gloves.defense +
                    build.waist.defense +
                    build.legs.defense
                  } DEF
                  </Text>
                </View>
                <LineMark />
              </View>
            </ScrollView>

            <EquipmentSelector build={build} props={selector} setSelector={setSelector} />
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </ImageBackground>
  );
}

function EquipmentCard({ equipment, setSelector }
  : {
    equipment: Weapon | Armor; setSelector: Dispatch<SetStateAction<{
      isShown: boolean;
      equipment?: Weapon | Armor;
    }>>
  }) {
  return <Pressable style={card_style.item} onPress={() => {
    setSelector({ isShown: true, equipment: equipment })
  }}>
    <EquipmentIcon type={equipment.type} size={70} />

    <View style={card_style.details}>
      <Title title={equipment.name} props={{width:13}} />

      <View style={card_style.stats}>
        {isWeapon(equipment) ?
          <View style={card_style.damage}>
            <Text style={card_style.text}>{equipment.damage} DMG</Text>
            <Image source={ELEMENT_ICONS[equipment.element]} style={card_style.element} />
          </View>
          :
          <Text style={card_style.text}>{equipment.defense} DEF</Text>
        }
      </View>
      <LineMark />
    </View>
  </Pressable>
}

const style = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center'
  },

  safe_area: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 56 : 0,
    justifyContent: "center",
    alignItems: "center"
  },

  build: {
    backgroundColor: color.Card,
    borderWidth: 2,
    borderColor: color.Pencil,
    display: "flex",
    width: 350,
    margin: 10,
    padding: 10
  },

  stats: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: color.InfoBG,
    paddingLeft: 10,
    paddingRight: 10
  },

  stats_details: {
    color: color.Text,
    fontWeight: 600
  },

  attack: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },

  element: {
    height: 30,
    width: 30,
  }
});

const card_style = StyleSheet.create({
  link: {
    margin: 10,
  },

  item: {
    backgroundColor: 'rgba(251, 231, 177, 0.7)',
    borderColor: 'rgb(133, 67, 5)',
    justifyContent: "space-between",
    borderWidth: 2,
    display: "flex",
    flexDirection: "row",
    width: '100%',
    padding: 10
  },

  details: {
    width: '70%',
  },

  stats: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 249, 233, 0.5)',
    paddingLeft: 10,
    width: '100%',
    height: 30
  },

  damage: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  element: {
    height: 30,
    width: 30,
  },

  text: {
    color: 'rgb(92, 50, 13)',
    fontWeight: 600
  }
});