import { BuildList } from '@/components/builds/build-list';
import { BuildsContextProvider } from '@/components/builds/builds-context-provider';
import { BottomBar } from '@/components/menus/bottom-bar';
import { useState } from 'react';
import { ImageBackground, Platform, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function Builds() {
  const [viewMode, setViewMode] = useState<'list' | 'card'>('list');
  const BACKGROUND_IMAGE = require('@assets/ui_elements/page_bg.png')

  return (
    <BuildsContextProvider>
      <ImageBackground source={BACKGROUND_IMAGE} style={style.background} resizeMode='stretch'>
        <SafeAreaProvider>
          <SafeAreaView style={style.safe_area}>
            <BuildList view={viewMode} />

            <BottomBar props={{ viewMode, setViewMode }} />

          </SafeAreaView>
        </SafeAreaProvider>
      </ImageBackground>
    </BuildsContextProvider>
  );
}

export const style = StyleSheet.create({
  safe_area: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 56 : 0
  },

  background: {
    flex: 1, justifyContent: 'center'
  }
});
