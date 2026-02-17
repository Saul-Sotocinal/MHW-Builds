import { StyleSheet, Text, View, FlatList, Image, Button, TextInput } from 'react-native';
import { Build, Weapon, Armor } from '../interfaces';
import { WEAPON_ICONS, ARMOR_ICONS, BUILDS_TEMPLATE, ELEMENT_ICONS } from '../data';
import { build_card_styles, build_list_styles, builds_display_styles, general_styles } from '../styles';
import { WeaponCard } from './weapon-card';
import { ArmorCard } from './armor-card';

export function BuildCard({ builds, view }: { builds: Build[], view: "list" | "card" }) {
  function buildCardStyle() {
    return StyleSheet.create({
      main: {
        ...general_styles.main,
        display: view === "card" ? "flex" : "none"
      }
    })
  }

  return <View style={buildCardStyle().main}>
    <FlatList
      data={builds}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  </View>
}

const renderItem = ({ item }: { item: Build }) => (
  <View style={build_card_styles.item}>
    <Text style={build_card_styles.title}>{item.name}</Text>

    <View>
      <WeaponCard weapon={item.weapon} />
      <ArmorCard armor={item.helm} />
      <ArmorCard armor={item.chest} />
      <ArmorCard armor={item.gloves} />
      <ArmorCard armor={item.waist} />
      <ArmorCard armor={item.legs} />
      <ArmorCard armor={item.talisman} />
    </View>

    <View style={build_card_styles.stats}>
      <Text style={build_card_styles.stats_details}>{item.weapon.damage} ATK</Text>
        <Text style={build_card_styles.stats_details}>{
          item.helm.defense +
          item.chest.defense +
          item.gloves.defense +
          item.waist.defense +
          item.legs.defense
        } DEF
        </Text>
    </View>
  </View>
);