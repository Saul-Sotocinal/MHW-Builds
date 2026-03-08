import { StyleSheet, Image } from 'react-native';

export function LineMark() {
  const LINE_BORDER = require('../../assets/ui_elements/line_mark.png')

  return <Image source={LINE_BORDER} style={style.line} />
}

export const style = StyleSheet.create({
  line: {
    height: 2, 
    width: "100%" 
  }
})