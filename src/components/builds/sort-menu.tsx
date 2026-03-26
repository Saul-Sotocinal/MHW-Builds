import { BuildsContext } from '@/components/builds/builds-context';
import { Build } from '@/types/interfaces';
import { Dispatch, SetStateAction, useContext } from 'react';
import { Button, StyleSheet, View } from 'react-native';

export function SortMenu({ display, setSortOption }:
  { display: boolean, setSortOption: Dispatch<SetStateAction<"name" | "damage" | "defense" | "none">> }) {
  const { builds, setBuilds } = useContext(BuildsContext)!;

  return (
    <View style={[{ display: display ? "flex" : "none" }, style.menu]}>
      <View style={style.top}>
        <Button title="Name" onPress={() => {
          setBuilds([...sortByName(builds)]);
          setSortOption("name")
        }} />
        <Button title="Damage" onPress={() => {
          setBuilds([...sortByDamage(builds)]);
          setSortOption("damage")
        }} />
        <Button title="Defense" onPress={() => {
          setBuilds([...sortByDefense(builds)]);
          setSortOption("defense")
        }} />
      </View>

      <Button title="Reset" onPress={() => {
        setBuilds([...resetSort(builds)]);
        setSortOption("none")
      }} />
    </View>
  );
}

export function sortByName(builds: Build[]) {
  return builds.sort((a, b) => {
    if (a.name > b.name) return 1;
    else if (a.name < b.name) return -1;

    return 0;
  });
}

export function sortByDamage(builds: Build[]) {
  return builds.sort((a, b) => {
    if (a.weapon.damage < b.weapon.damage) return 1;
    else if (a.weapon.damage > b.weapon.damage) return -1;
    return 0;
  });
}

export function sortByDefense(builds: Build[]) {
  return builds.sort((a, b) => {
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
}

export function resetSort(builds: Build[]) {
  return builds.sort((a, b) => {
    if (parseInt(a.id) > parseInt(b.id)) return 1;
    else if (parseInt(a.id) < parseInt(b.id)) return -1;

    return 0;
  });
}

const style = StyleSheet.create({
  menu: {
    backgroundColor: 'rgba(34, 34, 34, 0.8)',
    position: 'absolute',
    alignItems: 'center',
    bottom: 100,
    width: '100%',
    padding: 5,
    gap: 5
  },

  top: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5
  }
})