import { color } from '@/data/color-scheme';
import { ReactNode } from 'react';
import { DimensionValue, StyleSheet, View } from "react-native";
import { BorderedIcon } from './bordered-icon';
import { LineMark } from "./line-mark";
import { Title } from "./title";

export function Card({ iconList, type, name, children, props = DEFAULT_PROPS}: { 
  iconList: {[name: string]: any}, 
  type: string, 
  name: string,
  children: ReactNode 
  props?: props
  }) {
  return (
      <View style={[style.item, {width: props.width}]} >
        <BorderedIcon iconList={iconList} type={type} size={70} />

        <View style={style.details}>
          <Title title={name} props={{width:30}} />

          <View style={style.stats}>
            {children}
          </View>
          <LineMark />
        </View>
      </View>
  )
}

interface props {
  width?: number | DimensionValue,
}

const DEFAULT_PROPS: props = { width: '100%' }


const style = StyleSheet.create({
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
  }
});