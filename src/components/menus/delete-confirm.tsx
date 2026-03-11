import { BuildsContext } from '@/data/builds-context';
import { useContext } from 'react';
import { Button, StyleSheet, View } from 'react-native';

export function DeletetionConfirm({ display }:
  { display: boolean }) {
  const { builds, setBuilds } = useContext(BuildsContext)!;

  return (
    <View style={[{ display: display ? "flex" : "none" }, style.menu]}>
      <Button
        title="Delete"
        onPress={() => {
          console.log("vrvr")
        }}
      />
      <Button
        title="Cancel"
        onPress={() => {
          display = false
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
  }
})