import { StyleSheet, Text, View, FlatList, Image, Button, TextInput } from 'react-native';
import { Build, Weapon, Armor } from '../interfaces';
import { WEAPON_ICONS, ARMOR_ICONS, BUILDS_TEMPLATE, ELEMENT_ICONS } from '../data';
import { build_list_styles, builds_display_styles, general_styles } from '../styles';

export function BuildList({ builds, view }: { builds: Build[], view: "list" | "card" }) {
  function buildListStyle() {
    return StyleSheet.create({
      main: {
        ...general_styles.main,
        display: view === "list" ? "flex" : "none"
      }
    })
  }

  return <View style={buildListStyle().main}>
    <FlatList
      data={builds}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  </View>
}

const renderItem = ({ item }: { item: Build }) => (
  <View style={build_list_styles.item}>
    <Image source={WEAPON_ICONS[item.weapon.type]} style={build_list_styles.icon} />

    <View style={build_list_styles.details}>
      <Text>{item.name}</Text>

      <View style={build_list_styles.stats}>
        <View style={build_list_styles.damage}>
          <Text>{item.weapon.damage} DMG</Text>
          <Image source={ELEMENT_ICONS[item.weapon.element]} style={build_list_styles.element} />
        </View>

        <Text>{
          item.helm.defense +
          item.chest.defense +
          item.gloves.defense +
          item.waist.defense +
          item.legs.defense
        } DEF
        </Text>
      </View>
    </View>
  </View>
);