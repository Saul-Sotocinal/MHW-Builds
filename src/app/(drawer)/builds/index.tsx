import { BottomBar } from '@/components/builds/bottom-bar';
import { BuildsContext } from '@/components/builds/builds-context';
import { HiddenBuildsContext } from '@/components/builds/hidden-builds-context';
import { Card } from '@/components/general/card';
import { LineMark } from '@/components/general/line-mark';
import { Title } from '@/components/general/title';
import { color } from '@/data/color-scheme';
import { ELEMENT_ICONS } from '@/data/element_data';
import { EQUIPMENT_ICONS } from '@/data/equipment_data';
import { Build } from '@/types/interfaces';
import { Link } from 'expo-router';
import { useContext, useState } from 'react';
import { FlatList, Image, ImageBackground, Platform, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function Builds() {
  const [viewMode, setViewMode] = useState<'list' | 'card'>('list')
  const [flatListRef, setFlatListRef] = useState<FlatList<Build> | null>(null)
  const BACKGROUND_IMAGE = require('@assets/ui_elements/page_bg.png')
  const { builds, setBuilds } = useContext(BuildsContext)!
  const { hiddenBuilds, setHiddenBuilds } = useContext(HiddenBuildsContext)!

  return (
    <ImageBackground source={BACKGROUND_IMAGE} style={style.background} resizeMode='stretch'>
      <SafeAreaProvider>
        <SafeAreaView style={style.safe_area}>
          <FlatList
            style={style.list}
            contentContainerStyle={style.list_item}
            data={builds}
            renderItem={viewMode == "list" ? CompactCard : DetailedCard}
            keyExtractor={(item) => item.id}
            ref={(ref) => { setFlatListRef(ref) }}
          />

          <BottomBar viewMode={viewMode} setViewMode={setViewMode} flatListRef={flatListRef} />

        </SafeAreaView>
      </SafeAreaProvider>
    </ImageBackground>
  );

  function CompactCard({ item: build }: { item: Build }) {
    // Not rendering builds if filtered out
    if (!hiddenBuilds.every((id) => id !== build.id))
      return <View style={style.hidden} />

    return (
      <Link style={style.link} href={{ pathname: "/builds/[id]", params: { id: build.id } }}>
        <Card iconList={EQUIPMENT_ICONS} type={build.weapon.type} name={build.name} props={{ width: 350 }}>
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
  function DetailedCard({ item: build }: { item: Build }) {
    // Not rendering builds if filtered out
    if (!hiddenBuilds.every((id) => id !== build.id))
      return <View style={style.hidden} />

    return <Link style={detailed_style.link} href={{ pathname: "/builds/[id]", params: { id: build.id } }}>
      <View style={detailed_style.item}>
        <Title title={build.name} props={{ width: 130, bgColor: color.RedCard, decoColor: color.RedDeco }} />

        <View>
          <EquipmentLine type={build.weapon.type} name={build.weapon.name} />
          <EquipmentLine type={build.helm.type} name={build.helm.name} />
          <EquipmentLine type={build.chest.type} name={build.chest.name} />
          <EquipmentLine type={build.gloves.type} name={build.gloves.name} />
          <EquipmentLine type={build.waist.type} name={build.waist.name} />
          <EquipmentLine type={build.legs.type} name={build.legs.name} />
          <EquipmentLine type={build.talisman.type} name={build.talisman.name} />
        </View>

        <View style={detailed_style.stats}>
          <View style={detailed_style.attack}>
            <Text style={detailed_style.stats_details}>{build.weapon.damage} ATK</Text>
            <Image source={ELEMENT_ICONS[build.weapon.element]} style={detailed_style.element} />
          </View>
          <Text style={detailed_style.stats_details}>{
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
    </Link>
  }

  function EquipmentLine({ type, name }: { type: string, name: string }) {
    return <View>
      <View style={detailed_style.line}>
        <Image source={EQUIPMENT_ICONS[type]} style={detailed_style.icon} />
        <Text>{name}</Text>
      </View>
      <LineMark />
    </View>
  }
}

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
  },

  hidden: {
    display: 'none'
  }
});

const detailed_style = StyleSheet.create({
  link: {
    margin: 10,
  },

  item: {
    backgroundColor: color.Card,
    borderWidth: 2,
    borderColor: color.Pencil,
    display: "flex",
    width: 350,
    margin: 10,
    padding: 10
  },

  stats: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: color.InfoBG,
    paddingLeft: 10,
    paddingRight: 10
  },

  stats_details: {
    color: color.Text,
    fontWeight: 600
  },

  attack: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },

  element: {
    height: 30,
    width: 30,
  },

  line: {
    padding: 5,
    marginTop: 5,
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },

  icon: {
    width: 20,
    height: 20
  }
});