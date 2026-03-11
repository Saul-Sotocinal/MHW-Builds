import { BuildsContext } from '@/data/builds-context';
import { color } from '@/data/color-scheme';
import { useContext, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { LineMark } from './line-mark';
import { TextStroke } from './text-stroke';

export function Title({ title, props, renameId }:
  { title: string, props?: props, renameId?: string }) {
  const [text, setText] = useState(title)
  const {builds, setBuilds} = useContext(BuildsContext)!
  const TITLE_BORDER = require('@assets/ui_elements/title_border.png')
  props = { ...DEFAULT_PROPS, ...props }
  let widthToAdd = props.width ? props.width : 0;

  return <View>
    <LineMark props={{ tint: props.decoColor }} />
    <View style={[style.container, { backgroundColor: props.bgColor }]}>
      <Image source={TITLE_BORDER} style={[style.decoration, { tintColor: props.decoColor }]} resizeMode='stretch'></Image>
      <View style={{ width: props.width }}></View>
      <View style={[style.textWrapper, {width: 200 + widthToAdd - 20}]}>
        <TextStroke stroke={1} color='black'>
          {renameId ?
            <TextInput style={style.text} numberOfLines={1} value={text} onChangeText={(text) => {
              setText(text)
              builds.find((build) => build.id === renameId)!.name = text
              setBuilds([...builds]);
            }} />
            :
            <Text style={style.text} numberOfLines={1}>{title} </Text>
          }
        </TextStroke>
      </View>
      <Image source={TITLE_BORDER} style={[style.decoration, style.decoRight, { tintColor: props.decoColor }]} resizeMode='stretch'></Image>
    </View>
    <LineMark props={{ tint: props.decoColor }} />
  </View>
}

interface props {
  width?: number,
  bgColor?: string,
  decoColor?: string
}

const DEFAULT_PROPS: props = { width: 0, bgColor: color.Card, decoColor: color.Pencil }

export const style = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  text: {
    flex: 1,
    flexWrap: 'nowrap',
    flexShrink: 0,
    fontSize: 15,
    alignItems: 'center',
    justifyContent: 'center',
    color: "white",
    zIndex: 1
  },

  textWrapper: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    position: 'absolute'
  },

  decoration: {
    width: 100,
    height: 35
  },

  decoRight: {
    transform: [{ scaleX: -1 }]
  }
})