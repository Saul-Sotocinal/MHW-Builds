import { Build } from "../../interfaces"
import { View, StyleSheet, Text, Image } from "react-native"
import { EQUIPMENT_ICONS, ELEMENT_ICONS } from "../../data"
import { Title } from "../decorative/title"
import { LineMark } from "../decorative/line-mark"

export function DetailedCard({ item }: { item: Build }) {
  return <View style={style.item}>
    <Title title={item.name} width={130} bgColor='rgba(255, 234, 172, 0.7)' />

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
  item: {
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