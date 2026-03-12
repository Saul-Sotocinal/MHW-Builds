import { EquipmentSelector } from "@/components/builds/build-menus/equipment-selector";
import { BuildsContext } from "@/components/builds/builds-context";
import { Label } from "@/components/general/button-label";
import { Card } from "@/components/general/card";
import { LineMark } from "@/components/general/line-mark";
import { Title } from "@/components/general/title";
import { color } from "@/data/color-scheme";
import { ELEMENT_ICONS } from "@/data/element_data";
import { EQUIPMENT_ICONS } from "@/data/equipment_data";
import { Armor, isWeapon, Weapon } from "@/types/interfaces";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { Alert, Image, ImageBackground, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";


export default function BuildDetailScreen() {
  const { builds, setBuilds } = useContext(BuildsContext)!;
  const [selector, setSelector] = useState<{ isShown: boolean, equipment?: Weapon | Armor }>({ isShown: false });
  const { id } = useLocalSearchParams<{ id: string }>();
  const build = builds.find((b) => b.id === id);
  const router = useRouter();
  const BACKGROUND_IMAGE = require('@assets/ui_elements/page_bg.png')

  function deleteBuild() {
    Alert.alert("Confirm Deletion", "Are you sure you want to proceed?", [
      {
        text: "Cancel",
        style: "cancel"
      },
      {
        text: "Delete",
        onPress: () => {
          if (build)
            builds.splice(builds.indexOf(build), 1)
          setBuilds([...builds])
          router.back();
        }
      }
    ])

  }

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

  return (
    <ImageBackground source={BACKGROUND_IMAGE} style={style.background} resizeMode='stretch'>
      <SafeAreaProvider>
        <SafeAreaView style={style.safe_area}>
          <View>
            <ScrollView>
              <View style={style.build}>
                <Title title={build.name} renameId={build.id} props={{ width: 130, bgColor: color.RedCard, decoColor: color.RedDeco }} />

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
                  <Text style={style.stats_details}> {
                    build.helm.defense +
                    build.chest.defense +
                    build.gloves.defense +
                    build.waist.defense +
                    build.legs.defense
                  } DEF
                  </Text>
                </View>
                <LineMark />
                <Pressable onPress={deleteBuild} style={style.delete_button} >
                  <Label title='DELETE ' color='Red' props={{ width: 160 }} />
                </Pressable>
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
  return <Pressable onPress={() => {
    setSelector({ isShown: true, equipment: equipment })
  }}>
    <Card iconList={EQUIPMENT_ICONS} type={equipment.type} name={equipment.name}>
      {isWeapon(equipment) ?
        <View style={card_style.damage}>
          <Text style={card_style.text}>{equipment.damage} DMG</Text>
          <Image source={ELEMENT_ICONS[equipment.element]} style={card_style.element} />
        </View>
        :
        <Text style={card_style.text}>{equipment.defense} DEF</Text>
      }
    </Card>

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
    padding: 10,
    alignItems: 'center'
  },

  stats: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: color.InfoBG,
    paddingLeft: 10,
    paddingRight: 10,
    width: '100%'
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
  },

  delete_button: {
    marginTop: 10
  }
});

const card_style = StyleSheet.create({

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
    color: color.Text,
    fontWeight: 600
  }
});