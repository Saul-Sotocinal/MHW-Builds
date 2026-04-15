import { color } from '@/data/color-scheme';
import { useBuilds } from '@/state/builds-context';
import { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { LineMark } from './line-mark';
import { TextStroke } from './text-stroke';

export function Title({ title, props, renameId }:
  { title: string, props?: props, renameId?: number }) {
  const [text, setText] = useState(title)
  const { state, update } = useBuilds();
  const TITLE_BORDER = require('@assets/ui_elements/title_border.png')
  props = { ...DEFAULT_PROPS, ...props }

  return <View>
    <LineMark props={{ tint: props.decoColor }} />
    <View style={[style.container, { backgroundColor: props.bgColor }]}>
      <Image source={TITLE_BORDER} style={[style.decoration, { tintColor: props.decoColor }]} resizeMode='stretch'></Image>

      <View style={[style.textWrapper]}>
        <TextStroke stroke={1} color='black'>
          {
            renameId !== undefined ?
              <TextInput style={style.text} numberOfLines={1} value={text} onChangeText={(text) => {
                if (text === '')
                  text = ' '
                else if (text[0] === ' ')
                  text = text.trimStart()

                setText(text)
                const updatedBuild = state.builds.find((build) => build.id === renameId)!
                updatedBuild.name = text
                update(updatedBuild)
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
  bgColor?: string,
  decoColor?: string
}

const DEFAULT_PROPS: props = { bgColor: color.Card, decoColor: color.Pencil }

export const style = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  },

  text: {
    flex: 1,
    flexWrap: 'nowrap',
    flexShrink: 0,
    fontSize: 15,
    alignItems: 'center',
    justifyContent: 'center',
    color: "white",
    zIndex: 1,
  },

  textWrapper: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    position: 'absolute',
    left: '50%',
    transform: [{translateX: '-50%'}]
  },

  decoration: {
    width: 100,
    height: 35
  },

  decoRight: {
    transform: [{ scaleX: -1 }]
  }
})