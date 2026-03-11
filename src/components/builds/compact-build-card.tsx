import { color } from '@/data/color-scheme';
import { ELEMENT_ICONS } from '@/data/data';
import { Build } from "@/types/interfaces";
import { Link } from 'expo-router';
import { Image, StyleSheet, Text, View } from "react-native";
import { EquipmentIcon } from '../decorative/equipment-icon';
import { LineMark } from "../decorative/line-mark";
import { Title } from "../decorative/title";

export function CompactCard({ item: build }: { item: Build }) {
  return (
    <Link style={style.link} href={{ pathname: "/builds/[id]", params: { id: build.id } }}>
      <View style={style.item} >
        <EquipmentIcon type={build.weapon.type} size={70} />

        <View style={style.details}>
          <Title title={build.name} props={{width:30}} />

          <View style={style.stats}>
            <View style={style.damage}>
              <Text style={style.text}>{build.weapon.damage} DMG</Text>
              <Image source={ELEMENT_ICONS[build.weapon.element]} style={style.element} />
            </View>

            <Text style={style.text}>{
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
      </View>
    </Link>
  )
}

const style = StyleSheet.create({
  link: {
    margin: 10,
  },

  item: {
    backgroundColor: color.Card,
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