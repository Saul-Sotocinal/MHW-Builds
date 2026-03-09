import { BuildList } from '@/components/builds/build-list';
import { BottomBar } from '@/components/menus/bottom-bar';
import { BUILDS_TEMPLATE } from '@/data/data';
import { Build } from '@/types/interfaces';
import { useState } from 'react';
import { ImageBackground, Platform, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function Builds() {
  const [builds, setBuilds] = useState<Build[]>(BUILDS_TEMPLATE);
  const [viewMode, setViewMode] = useState<'list' | 'card'>('list');
  const BACKGROUND_IMAGE = require('@assets/ui_elements/page_bg.png')

  return (
    <ImageBackground source={BACKGROUND_IMAGE} style={style.background} resizeMode='stretch'>
      <SafeAreaProvider>
        <SafeAreaView style={style.safe_area}>
          <BuildList builds={builds} view={viewMode} />

          <BottomBar props={{ viewMode, setViewMode, builds, setBuilds }} />

        </SafeAreaView>
      </SafeAreaProvider>
    </ImageBackground>
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
