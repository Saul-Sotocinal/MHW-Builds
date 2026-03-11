import { color } from "@/data/color-scheme"
import { ELEMENT_ICONS, EQUIPMENT_ICONS } from "@/data/data"
import { Build } from "@/types/interfaces"
import { Link } from "expo-router"
import { Image, StyleSheet, Text, View } from "react-native"
import { LineMark } from "../decorative/line-mark"
import { Title } from "../decorative/title"

export function DetailedCard({ item }: { item: Build }) {
  return <Link style={style.link} href={{ pathname: "/builds/[id]", params: { id: item.id } }}>
    <View style={style.item}>
      <Title title={item.name} props={{width:130, bgColor: color.RedCard, decoColor: color.RedDeco}}/>

      <View>
        <EquipmentCard type={item.weapon.type} name={item.weapon.name} />
        <EquipmentCard type={item.helm.type} name={item.helm.name} />
        <EquipmentCard type={item.chest.type} name={item.chest.name} />
        <EquipmentCard type={item.gloves.type} name={item.gloves.name} />
        <EquipmentCard type={item.waist.type} name={item.waist.name} />
        <EquipmentCard type={item.legs.type} name={item.legs.name} />
        <EquipmentCard type={item.talisman.type} name={item.talisman.name} />
      </View>

      <View style={style.stats}>
        <View style={style.attack}>
          <Text style={style.stats_details}>{item.weapon.damage} ATK</Text>
          <Image source={ELEMENT_ICONS[item.weapon.element]} style={style.element} />
        </View>
        <Text style={style.stats_details}>{
          item.helm.defense +
          item.chest.defense +
          item.gloves.defense +
          item.waist.defense +
          item.legs.defense
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