import { Card } from '@/components/general/card';
import { color } from '@/data/color-scheme';
import { ELEMENT_ICONS } from '@/data/element_data';
import { Monster, MONSTER_ICONS, MONSTERS } from '@/data/monsters_data';
import { FlatList, Image, ImageBackground, Platform, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function Monsters() {
  const BACKGROUND_IMAGE = require('@assets/ui_elements/page_bg.png')

  return (
    <ImageBackground source={BACKGROUND_IMAGE} style={{ flex: 1, justifyContent: 'center' }} resizeMode='stretch'>
      <SafeAreaProvider>
        <SafeAreaView style={style.safe_area}>
          <FlatList
            data={MONSTERS}
            renderItem={CompactCard}
            keyExtractor={(item, index) => index.toString()}
          />
        </SafeAreaView>
      </SafeAreaProvider>
    </ImageBackground>
  );

  function CompactCard({ item: monster }: { item: Monster }) {
    return (
      <View style={style.card}>
        <Card iconList={MONSTER_ICONS} type={monster.name} name={monster.name} props={{ width: 350 }}>
          <View style={style.damage}>
            <Text style={style.text}>{monster.type}</Text>
            <Image source={ELEMENT_ICONS[monster.element]} style={style.element} />
          </View>
        </Card>
      </View>
    )
  }
}

const style = StyleSheet.create({
  safe_area: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Platform.OS === "android" ? 64 : 0
  },

  card: {
    margin: 5,
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