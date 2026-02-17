import { useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Build, Weapon, Armor } from './interfaces';
import { WEAPON_ICONS, ARMOR_ICONS, BUILDS_TEMPLATE, ELEMENT_ICONS } from './data';
import { build_list_styles, builds_display_styles, general_styles } from './styles';
import { BuildList } from './components/build-list';
import { BottomBar } from './components/bottom-bar';
import { BuildCard } from './components/build-card';

export default function App() {
  const [builds, setBuilds] = useState<Build[]>(BUILDS_TEMPLATE);
  const [viewMode, setViewMode] = useState<'list' | 'card'>('list');

  return (
    <SafeAreaProvider>
      <SafeAreaView style={general_styles.safe_area}>
        <BuildList builds={builds} view={viewMode}/>
        <BuildCard builds={builds} view={viewMode} />

        <BottomBar props={{viewMode, setViewMode, builds, setBuilds}}/>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
