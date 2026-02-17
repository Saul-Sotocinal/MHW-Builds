import { StyleSheet, Text, View, FlatList, Image, Button, TextInput } from 'react-native';
import { general_styles, sort_styles } from '../styles';
import { useState } from 'react';
import { BUILDS_TEMPLATE, WEAPON_ICONS } from '../data';
import { Checkbox } from 'expo-checkbox';
import { Build } from '../interfaces';

export function SortMenu({ display, builds, setBuilds }:
  { display: boolean, builds: Build[], setBuilds: React.Dispatch<React.SetStateAction<Build[]>> }) {
  return (
    <View
      style={[{ display: display ? "flex" : "none" }, sort_styles.menu]}>
      <Button
        title="Name"
        onPress={() => {
          const newBuilds = builds.sort((a, b) => {
            if (a.name > b.name) return 1;
            else if (a.name < b.name) return -1;

            return 0;
          });
          setBuilds([...newBuilds]);
        }}
      />
      <Button
        title="Damage"
        onPress={() => {
          const newBuilds = builds.sort((a, b) => {
            if (a.weapon.damage < b.weapon.damage) return 1;
            else if (a.weapon.damage > b.weapon.damage) return -1;
            return 0;
          });
          setBuilds([...newBuilds]);
        }}
      />
      <Button
        title="Defense"
        onPress={() => {
          const newBuilds = builds.sort((a, b) => {
            const aDef =
              a.helm.defense +
              a.chest.defense +
              a.gloves.defense +
              a.waist.defense +
              a.legs.defense;
            const bDef =
              b.helm.defense +
              b.chest.defense +
              b.gloves.defense +
              b.waist.defense +
              b.legs.defense;

            if (aDef < bDef) return 1;
            else if (aDef > bDef) return -1;
            return 0;
          });
          setBuilds([...newBuilds]);
        }}
      />
      <Button
        title="Reset"
        onPress={() => {
          const newBuilds = builds.sort((a, b) => {
            if (parseInt(a.id) > parseInt(b.id)) return 1;
            else if (parseInt(a.id) < parseInt(b.id)) return -1;

            return 0;
          });
          setBuilds([...newBuilds]);
        }}
      />
    </View>
  );
}