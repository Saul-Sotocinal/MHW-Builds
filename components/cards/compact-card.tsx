import { Build } from "../../interfaces"
import { View, ImageBackground, Image, StyleSheet, Text} from "react-native"
import { Title } from "../decorative/title"
import { ELEMENT_ICONS, EQUIPMENT_ICONS } from '../../data';
import { LineMark } from "../decorative/line-mark";

const ICON_BACKGROUND = require('../../assets/ui_elements/icon_border.png')

export function CompactCard({ item }: { item: Build }) {
  return <View style={style.item}>
    <ImageBackground source={ICON_BACKGROUND} style={style.icon_border}>
    <Image source={EQUIPMENT_ICONS[item.weapon.type]} style={style.icon} />
    </ImageBackground>

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
      <LineMark/>
    </View>
  </View>
}

const style = StyleSheet.create({
  item: {
    backgroundColor: 'rgba(251, 231, 177, 0.7)',
    borderWidth: 2,
    borderColor: 'rgb(133, 67, 5)',
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: 350,
    margin: 10,
    padding: 10
  },

  details: {
    width: '70%',
  },

  icon_border: { 
    justifyContent: 'center', 
    alignItems: 'center', 
    width: 70, 
    height: 70 
  },

  icon: {
    height: 40,
    width: 40
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