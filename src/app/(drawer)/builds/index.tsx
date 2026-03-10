import { BuildList } from '@/components/builds/build-list';
import { BottomBar } from '@/components/menus/bottom-bar';
import { Build } from '@/types/interfaces';
import { useState } from 'react';
import { FlatList, ImageBackground, Platform, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function Builds() {
  const [viewMode, setViewMode] = useState<'list' | 'card'>('list');
  const [flatListRef, setFlatListRef] = useState<FlatList<Build> | null>(null)
  const BACKGROUND_IMAGE = require('@assets/ui_elements/page_bg.png')

  return (
    <ImageBackground source={BACKGROUND_IMAGE} style={style.background} resizeMode='stretch'>
      <SafeAreaProvider>
        <SafeAreaView style={style.safe_area}>
          <BuildList view={viewMode} setFlatListRef={setFlatListRef}/>

          <BottomBar viewMode={viewMode} setViewMode={setViewMode} flatListRef={flatListRef} />

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
