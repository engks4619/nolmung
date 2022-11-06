import React from 'react';
import {FlatList, ScrollView, StyleSheet, View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Squre from '~/atoms/Squre';
import {Spot} from '~/pages/Spots';
import Pencil from '@assets/pencil.svg';

interface Props {
  spotList: Spot[];
  loadMore: Function;
}

function SpotsContainer({spotList, loadMore}: Props) {
  return (
    <FlatList
      data={spotList}
      numColumns={2}
      columnWrapperStyle={styles.row}
      keyExtractor={(item, idx) => idx.toString()}
      renderItem={({item}) => (
        <View key={item.spotId} style={styles.container}>
          <View style={styles.imgContainer}>
            {item.imgCnt != 0 ? (
              
                <Squre
                  width={130}
                  height={130}
                  borderRadius={5}
                  imageSource={
                    'http://nolmung.kr:8083/api/images/spot/' +
                    item.spotId +
                    '/0.jpg'
                  }
                />
                ) : (
                <Squre
                  width={130}
                  height={130}
                  borderRadius={5}
                  imageSource={
                    'http://nolmung.kr:8083/api/images/spot/inYblvHVDsMJ/0.jpg'
                  }
                  />
            )}
          </View>
          <View style={styles.hContainer}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
              {spotList.indexOf(item) + 1}.{item.name}
            </Text>
            
          </View>
          <Text>
              {item.star ? item.star : '평점 없음'}
            </Text>
          <View style={styles.hContainer}>
            <Text style={styles.desc}>
              동작/사당
            </Text>      
            <Text>
              <Pencil width={10} height={10} fill={'black'} stroke={'black'} />
              {item.reviewCnt}
            </Text>
          </View>
          
          {/* <Text>{}.{item.name}</Text> */}
        </View>
      )}
      onEndReached={() => loadMore()}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: '50%',
  },
  row: {
    flex: 1,
    justifyContent: 'space-around',
  },
  imgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  hContainer: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
  },
  desc: {
    fontSize: 10,
  }
});

export default SpotsContainer;
