import { ImageBackground, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function Monsters() {
  const BACKGROUND_IMAGE = require('@assets/ui_elements/page_bg.png')

  return (
    <ImageBackground source={BACKGROUND_IMAGE} style={{ flex: 1, justifyContent: 'center' }} resizeMode='stretch'>
      <SafeAreaProvider>
        <SafeAreaView style={style.safe_area}>

        </SafeAreaView>
      </SafeAreaProvider>
    </ImageBackground>
  );
}

export const style = StyleSheet.create({
  safe_area: {
    flex: 1
  }
});