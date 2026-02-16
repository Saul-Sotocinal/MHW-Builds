import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Build, Weapon, Armor } from './interfaces';
import { WEAPON_ICONS, ARMOR_ICONS, BUILDS_TEMPLATE, ELEMENT_ICONS } from './data';
import { build_list_styles, general_styles } from './styles';

export default function App() {
  const [builds] = useState<Build[]>(BUILDS_TEMPLATE);
  const renderItem = ({ item }: { item: Build }) => (
    <View style={build_list_styles.build_list_item}>
      <Image source={WEAPON_ICONS[item.weapon.type]} style={build_list_styles.build_list_icon}/>

      <View style={build_list_styles.build_list_details}>
        <Text>{item.name}</Text>

        <View style={build_list_styles.build_list_stats}>
          <View style={build_list_styles.build_list_damage}>
            <Text>{item.weapon.damage} DMG</Text>
            <Image source={ELEMENT_ICONS[item.weapon.element]} style={build_list_styles.build_list_element} />
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

  return (
    <SafeAreaProvider>
      <SafeAreaView style={general_styles.safe_area}>
        <View style={general_styles.main}>
          <FlatList
            data={builds}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
