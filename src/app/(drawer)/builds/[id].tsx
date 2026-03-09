import { EquipmentIcon } from "@/components/decorative/equipment-icon";
import { LineMark } from "@/components/decorative/line-mark";
import { Title } from "@/components/decorative/title";
import { BUILDS_TEMPLATE, ELEMENT_ICONS } from "@/data/data";
import { Armor, Weapon } from "@/types/interfaces";
import { useLocalSearchParams } from "expo-router";
import { Image, ImageBackground, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";


export default function BuildDetailScreen() {
  const BACKGROUND_IMAGE = require('@assets/ui_elements/page_bg.png')

  const { id } = useLocalSearchParams<{ id: string }>();
  const build = BUILDS_TEMPLATE.find((t) => t.id === id);

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
                <Title title={build.name} width={130} bgColor='#b93f32' decoColor='#dac342'/>

                <View>
                  <EquipmentCard equipment={build.weapon} />
                  <EquipmentCard equipment={build.helm} />
                  <EquipmentCard equipment={build.chest} />
                  <EquipmentCard equipment={build.gloves} />
                  <EquipmentCard equipment={build.waist} />
                  <EquipmentCard equipment={build.legs} />
                  <EquipmentCard equipment={build.talisman} />
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
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </ImageBackground>
  );
}

function EquipmentCard({ equipment }: { equipment: Weapon | Armor }) {
  return <View style={card_style.item} >
    <EquipmentIcon type={equipment.type} size={70} />

    <View style={card_style.details}>
      <Title title={equipment.name} width={15} bgColor='rgba(255, 234, 172, 0.7)' decoColor='#854305' />

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
  </View>
}

function isWeapon(equipment: Weapon | Armor): equipment is Weapon {
  return (equipment as Weapon).damage !== undefined;
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
    backgroundColor: 'rgba(251, 231, 177, 0.7)',
    borderWidth: 2,
    borderColor: 'rgb(133, 67, 5)',
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
    backgroundColor: 'rgba(255, 249, 233, 0.5)',
    paddingLeft: 10,
    paddingRight: 10
  },

  stats_details: {
    color: 'rgb(92, 50, 13)',
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