import React from 'react';
import {FlatList, ScrollView, StyleSheet, View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Squre from '~/atoms/Squre';
import {Spot} from '~/pages/Spots';

interface Props {
  spotList: Spot[];
  loadMore: Function;
}

function SpotsContainer({spotList, loadMore}: Props) {
  console.log(spotList);
  return (
    <FlatList
      data={spotList}
      numColumns={2}
      columnWrapperStyle={styles.row}
      keyExtractor={(item, idx) => idx}
      renderItem={({item}) => (
        <View key={item.spotId} style={styles.container}>
          {item.imgCnt != 0 ?
          <View>
            <Squre imageSource={'http://nolmung.kr:8083/api/images/spot/'+item.spotId+'/0.jpg'}/>
          </View>
          : <View>
          <Squre imageSource={'http://nolmung.kr:8083/api/images/spot/inYblvHVDsMJ/0.jpg'}/>
        </View>}
          <Text>{spotList.indexOf(item)+1}.{item.name}</Text>
        </View>
      )}
      onEndReached={() => loadMore()}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'yellow',
  },
  row: {
    flex: 1,
    justifyContent: "space-around"
}
});

export default SpotsContainer;
