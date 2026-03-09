import { BuildsContext } from '@/data/builds-context';
import { Build } from '@/types/interfaces';
import { useContext } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { CompactCard } from './compact-build-card';
import { DetailedCard } from './detailed-build-card';

export function BuildList({ view }: { view: "list" | "card" }) {
  const { builds, setBuilds } = useContext(BuildsContext)!;
  return <View style={style.list}>
    <FlatList
      data={builds}
      renderItem={view == "list" ? renderCompactCard : renderDetailedCard}
      keyExtractor={(item) => item.id}
    />
  </View>
}

const renderCompactCard = ({ item }: { item: Build }) => (<CompactCard item={item} />);

const renderDetailedCard = ({ item }: { item: Build }) => (<DetailedCard item={item} />);

const style = StyleSheet.create({
  list: {
    flex: 1,
    alignItems: 'center'
  }
});