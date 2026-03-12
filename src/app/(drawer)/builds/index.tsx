import { BottomBar } from '@/components/builds/build-menus/bottom-bar';
import { BuildsContext } from '@/components/builds/builds-context';
import { DetailedCard } from '@/components/builds/detailed-build-card';
import { Card } from '@/components/general/card';
import { color } from '@/data/color-scheme';
import { ELEMENT_ICONS } from '@/data/element_data';
import { EQUIPMENT_ICONS } from '@/data/equipment_data';
import { Build } from '@/types/interfaces';
import { Link } from 'expo-router';
import { useContext, useState } from 'react';
import { FlatList, Image, ImageBackground, Platform, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function Builds() {
  const [viewMode, setViewMode] = useState<'list' | 'card'>('list');
  const [flatListRef, setFlatListRef] = useState<FlatList<Build> | null>(null)
  const BACKGROUND_IMAGE = require('@assets/ui_elements/page_bg.png')
  const { builds, setBuilds } = useContext(BuildsContext)!;

  return (
    <ImageBackground source={BACKGROUND_IMAGE} style={style.background} resizeMode='stretch'>
      <SafeAreaProvider>
        <SafeAreaView style={style.safe_area}>
          <FlatList
            style={style.list}
            contentContainerStyle={style.list_item}
            data={builds}
            renderItem={viewMode == "list" ? renderCompactCard : renderDetailedCard}
            keyExtractor={(item) => item.id}
            ref={(ref) => { setFlatListRef(ref) }}
          />

          <BottomBar viewMode={viewMode} setViewMode={setViewMode} flatListRef={flatListRef} />

        </SafeAreaView>
      </SafeAreaProvider>
    </ImageBackground>
  );
}

function CompactCard({ item: build }: { item: Build }) {
  return (
    <Link style={style.link} href={{ pathname: "/builds/[id]", params: { id: build.id } }}>
      <Card iconList={EQUIPMENT_ICONS} type={build.weapon.type} name={build.name} props={{width: 350}}>
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
      </Card>
    </Link>
  )
}

const renderCompactCard = ({ item }: { item: Build }) => (<CompactCard item={item} />);

const renderDetailedCard = ({ item }: { item: Build }) => (<DetailedCard item={item} />);

export const style = StyleSheet.create({
  list: {
    display: 'flex'
  },

  list_item: {
    alignItems: 'center'
  },

  safe_area: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 56 : 0
  },

  background: {
    flex: 1, justifyContent: 'center'
  },

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