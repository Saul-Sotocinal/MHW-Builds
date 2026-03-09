import { EquipmentIcon } from "@/components/decorative/equipment-icon";
import { LineMark } from "@/components/decorative/line-mark";
import { Title } from "@/components/decorative/title";
import { BUILDS_TEMPLATE, ELEMENT_ICONS } from "@/data/data";
import { Armor, Weapon } from "@/types/interfaces";
import { useLocalSearchParams } from "expo-router";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";


export default function TaskDetailScreen() {
  const BACKGROUND_IMAGE = require('@assets/ui_elements/page_bg.png')

  const { id } = useLocalSearchParams<{ id: string }>();
  const build = BUILDS_TEMPLATE.find((t) => t.id === id);

  if (!build) {
    return (
      <ImageBackground source={BACKGROUND_IMAGE} style={{ flex: 1, justifyContent: 'center' }} resizeMode='stretch'>
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
          <View style={style.build}>
            <Title title={build.name} width={130} bgColor='rgba(255, 234, 172, 0.7)' />

            <View>
              <WeaponCard weapon={build.weapon} />
              <ArmorCard armor={build.helm} />
              <ArmorCard armor={build.chest} />
              <ArmorCard armor={build.gloves} />
              <ArmorCard armor={build.waist} />
              <ArmorCard armor={build.legs} />
              <ArmorCard armor={build.talisman} />
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
        </SafeAreaView>
      </SafeAreaProvider>
    </ImageBackground>
  );
}

function WeaponCard({ weapon }: { weapon: Weapon }) {
  return <View style={card_style.item} >
      <EquipmentIcon type={weapon.type} size={70}/>

      <View style={card_style.details}>
        <Title title={weapon.name} width={15} bgColor='rgba(255, 234, 172, 0.7)' />

        <View style={card_style.stats}>
          <View style={card_style.damage}>
            <Text style={card_style.text}>{weapon.damage} DMG</Text>
            <Image source={ELEMENT_ICONS[weapon.element]} style={card_style.element} />
          </View>
        </View>
        <LineMark />
      </View>
    </View>
}

function ArmorCard({ armor }: { armor: Armor }) {
  return <View style={card_style.item} >
    <EquipmentIcon type={armor.type} size={70} />

    <View style={card_style.details}>
      <Title title={armor.name} width={15} bgColor='rgba(255, 234, 172, 0.7)' />

      <View style={card_style.stats}>
        <Text style={card_style.text}>{armor.defense} DEF</Text>
      </View>
      <LineMark />
    </View>
  </View>
}

const style = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center'
  },

  safe_area: {
    flex: 1,
    paddingTop: 65,
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