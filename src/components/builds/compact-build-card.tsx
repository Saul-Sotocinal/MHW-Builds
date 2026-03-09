import { ELEMENT_ICONS } from '@/data/data';
import { Build } from "@/types/interfaces";
import { Link } from 'expo-router';
import { Image, StyleSheet, Text, View } from "react-native";
import { EquipmentIcon } from '../decorative/equipment-icon';
import { LineMark } from "../decorative/line-mark";
import { Title } from "../decorative/title";

export function CompactCard({ item }: { item: Build }) {
  return <Link style={style.link} href={{ pathname: "/builds/[id]", params: { id: item.id } }}>
    <View style={style.item} >
      <EquipmentIcon type={item.weapon.type} size={70}/>

      <View style={style.details}>
        <Title title={item.name} width={30} bgColor='rgba(255, 234, 172, 0.7)' />

        <View style={style.stats}>
          <View style={style.damage}>
            <Text style={style.text}>{item.weapon.damage} DMG</Text>
            <Image source={ELEMENT_ICONS[item.weapon.element]} style={style.element} />
          </View>

          <Text style={style.text}>{
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
    </View>
  </Link>
}

const style = StyleSheet.create({
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
    width: 350,
    padding: 10
  },

  details: {
    width: '70%',
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