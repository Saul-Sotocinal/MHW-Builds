import { Image, StyleSheet } from 'react-native';

export function LineMark({ props }: { props?: props }) {
  const LINE_BORDER = require('@assets/ui_elements/line_mark.png')

  return <Image source={LINE_BORDER} style={[style.line, {tintColor: props?.tint}]} />
}

interface props {
  tint: string
}

export const style = StyleSheet.create({
  line: {
    height: 2, 
    width: "100%" 
  }
})