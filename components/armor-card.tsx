import { StyleSheet, Text, View, FlatList, Image, Button, TextInput } from 'react-native';
import { Build, Weapon, Armor } from '../interfaces';
import { WEAPON_ICONS, ARMOR_ICONS, BUILDS_TEMPLATE, ELEMENT_ICONS } from '../data';
import { build_card_styles } from '../styles';

export function ArmorCard({ armor }: { armor: Armor }) {
  return <View style={build_card_styles.equipment_card}>
    <Image source={ARMOR_ICONS[armor.type]} style={build_card_styles.icon}/>
    <View>
      <Text>{armor.name}</Text>
      <Text>{armor.defense} DEF</Text>
    </View>
  </View>
}