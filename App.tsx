import { useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Build } from './interfaces';
import { BUILDS_TEMPLATE } from './data';
import { BuildList } from './components/cards/build-list';
import { BottomBar } from './components/menus/bottom-bar';
import { ImageBackground, StyleSheet } from 'react-native';

export default function App() {
  const [builds, setBuilds] = useState<Build[]>(BUILDS_TEMPLATE);
  const [viewMode, setViewMode] = useState<'list' | 'card'>('list');
  const BACKGROUND_IMAGE = require('./assets/ui_elements/page_bg.png')

  return (
    <ImageBackground source={BACKGROUND_IMAGE} style={{ flex: 1, justifyContent: 'center' }} resizeMode='stretch'>
      <SafeAreaProvider>
        <SafeAreaView style={general_styles.safe_area}>
          <BuildList builds={builds} view={viewMode} />

          <BottomBar props={{ viewMode, setViewMode, builds, setBuilds }} />

        </SafeAreaView>
      </SafeAreaProvider>
    </ImageBackground>
  );
}

export const general_styles = StyleSheet.create({
  safe_area: {
    flex: 1
  }
});
