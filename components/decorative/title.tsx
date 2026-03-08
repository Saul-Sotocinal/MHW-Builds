import { StyleSheet, Text, View, Image } from 'react-native';
import { TextStroke } from './text-stroke';
import { LineMark } from './line-mark';

export function Title({ title, width, bgColor }: { title: string, width: number, bgColor: string }) {
  const TITLE_BORDER = require('../../assets/ui_elements/title_border.png')

  return <View>
  <LineMark/>
  <View style={[style.container, {backgroundColor: bgColor}]}>
    <Image source={TITLE_BORDER} style={style.decoration} resizeMode='stretch'></Image>
      <View style={{width: width}}></View>
      <View style={style.textWrapper}>
        <TextStroke stroke={1} color='#000'>
          <Text style={style.text}>{title}</Text>
        </TextStroke>
      </View>
    <Image source={TITLE_BORDER} style={[style.decoration, style.decoRight]} resizeMode='stretch'></Image>
  </View>
  <LineMark/>
</View>
}

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
        color: 'rgb(255, 255, 255)',
        zIndex: 1
    },

    textWrapper: {
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "nowrap",
        flexShrink: 0,
        display: "flex",
        position: 'absolute'
    },

    decoration: {
        width: 100,
        height: 35,
    },

    decoRight: {
        transform: [{ scaleX: -1 }]
    }
})