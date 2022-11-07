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
          
            <View style={styles.descContainer}>
              <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
                {spotList.indexOf(item) + 1}. {item.name}
              </Text>
              <Text style={[styles.star, styles.right]}>
                  {item.star ? item.star : '0.0'}
                </Text>
            </View>
            <View style={[styles.descContainer, styles.right]}>
              
            </View>
            <View style={styles.descContainer}>
              <Text style={styles.desc}>
                동작/사당
              </Text>      
              <Text style={styles.reviewContainer}>
                <Pencil width={10} height={10} fill={'black'} stroke={'black'} />
                  {item.reviewCnt}
              </Text>
            </View>
          
        </View>
      )}
      onEndReached={() => loadMore()}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
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
  title: {
    fontSize: 13,
    fontWeight: '700',
    paddingTop: 5,
    width:'80%'
  },
  descContainer: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  desc: {
    fontSize: 10,
  },
  right: {
    justifyContent: 'flex-end'
  },
  star: {
    paddingTop: 5,
    fontSize: 12,
    fontWeight: '500'
  },
  reviewContainer: {
    paddingHorizontal: 10
  }
});

export default SpotsContainer;
