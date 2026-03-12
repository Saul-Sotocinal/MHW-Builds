import { BuildsContext } from '@/components/builds/builds-context';
import { useContext } from 'react';
import { Button, StyleSheet, View } from 'react-native';

export function SortMenu({ display }:
  { display: boolean }) {
  const { builds, setBuilds } = useContext(BuildsContext)!;

  return (
    <View style={[{ display: display ? "flex" : "none" }, style.menu]}>
      <View style={style.top}>
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
      </View>

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