import { color } from "@/data/color-scheme"
import { ELEMENT_ICONS } from "@/data/element_data"
import { EQUIPMENT_ICONS } from "@/data/equipment_data"
import { Build } from "@/types/interfaces"
import { Link } from "expo-router"
import { Image, StyleSheet, Text, View } from "react-native"
import { LineMark } from "../general/line-mark"
import { Title } from "../general/title"

export function DetailedCard({ item: build }: { item: Build }) {
  return <Link style={style.link} href={{ pathname: "/builds/[id]", params: { id: build.id } }}>
    <View style={style.item}>
      <Title title={build.name} props={{width:130, bgColor: color.RedCard, decoColor: color.RedDeco}}/>

      <View>
        <EquipmentCard type={build.weapon.type} name={build.weapon.name} />
        <EquipmentCard type={build.helm.type} name={build.helm.name} />
        <EquipmentCard type={build.chest.type} name={build.chest.name} />
        <EquipmentCard type={build.gloves.type} name={build.gloves.name} />
        <EquipmentCard type={build.waist.type} name={build.waist.name} />
        <EquipmentCard type={build.legs.type} name={build.legs.name} />
        <EquipmentCard type={build.talisman.type} name={build.talisman.name} />
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
  </Link>
}

function EquipmentCard({ type, name }: { type: string, name: string }) {
  return <View>
    <View style={style.card}>
      <Image source={EQUIPMENT_ICONS[type]} style={style.icon} />
      <Text>{name}</Text>
    </View>
    <LineMark />
  </View>
}

const style = StyleSheet.create({
  link: {
    margin: 10,
  },

  item: {
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
  },

  card: {
    padding: 5,
    marginTop: 5,
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },

  icon: {
    width: 20,
    height: 20
  }
});