import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { TextStroke } from './text-stroke';

export function Label({ title, color, props }:
  { title: string, color: string, props?: props }) {
  const COLOR: { [name: string]: any } = {
    "Red": require('@assets/ui_elements/label_R.png'),
    "Green": require('@assets/ui_elements/label_G.png')
  }
  props = { ...DEFAULT_PROPS, ...props }

  return <ImageBackground source={COLOR[color]}
    style={[style.container, { width: props.width, height: props.height }]} resizeMode='stretch'>
    <View style={style.container}>
      <View style={style.textWrapper}>
        <TextStroke stroke={1} color='black'>
          <Text style={style.text}>{title} </Text>
        </TextStroke>
      </View>
    </View>
  </ImageBackground>
}

interface props { width?: number, height?: number }
const DEFAULT_PROPS: props = { width: 160, height: 40 }

export const style = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
  }
})