import { StyleSheet, Text, View, FlatList, Image, Button, TextInput } from 'react-native';
import { Build, Weapon, Armor } from '../interfaces';
import { WEAPON_ICONS, ARMOR_ICONS, BUILDS_TEMPLATE, ELEMENT_ICONS } from '../data';
import { build_card_styles } from '../styles';

export function WeaponCard({ weapon }: { weapon: Weapon }) {
  return <View style={build_card_styles.equipment_card}>
    <Image source={WEAPON_ICONS[weapon.type]} style={build_card_styles.icon}/>
    <View>
      <Text>{weapon.name}</Text>
      <View style={build_card_styles.damage}>
        <Text>{weapon.damage} ATK</Text>
        <Image source={ELEMENT_ICONS[weapon.element]} style={build_card_styles.element} />
      </View>
    </View>
  </View>
}