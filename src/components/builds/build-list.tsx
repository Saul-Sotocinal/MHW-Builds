import { BuildsContext } from '@/data/builds-context';
import { Build } from '@/types/interfaces';
import { Dispatch, SetStateAction, useContext } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { CompactCard } from './compact-build-card';
import { DetailedCard } from './detailed-build-card';

export function BuildList({ view, setFlatListRef }: { view: "list" | "card", setFlatListRef: Dispatch<SetStateAction<FlatList<Build> | null>> }) {
  const { builds, setBuilds } = useContext(BuildsContext)!;

  return <View style={style.list}>
    <FlatList
      data={builds}
      renderItem={view == "list" ? renderCompactCard : renderDetailedCard}
      keyExtractor={(item) => item.id}
      ref={(ref) => { setFlatListRef(ref) }}
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