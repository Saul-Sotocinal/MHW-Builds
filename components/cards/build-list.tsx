import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Build } from '../../interfaces';
import { CompactCard } from './compact-card';
import { DetailedCard } from './detailed-card';

export function BuildList({ builds, view }: { builds: Build[], view: "list" | "card" }) {
  return <View style={style.list}>
    <FlatList
      data={builds}
      renderItem={view == "list" ? renderCompactCard : renderDetailedCard}
      keyExtractor={(item) => item.id}
    />
  </View>
}

const renderCompactCard = ({ item }: { item: Build }) => ( <CompactCard item={item}/> );

const renderDetailedCard = ({ item }: { item: Build }) => ( <DetailedCard item={item}/> );

const style = StyleSheet.create({
  list: {
    flex: 1,
    alignItems: 'center'
  }
});