import React, {useRef} from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Button,
} from 'react-native';
import Squre from '~/atoms/Squre';
import {Spot} from '~/pages/Spots';
import Pencil from '@assets/pencil.svg';

interface Props {
  spotList: Spot[];
  loadMore: Function;
}

const SPOT_IMG_URL = 'http://nolmung.kr/api/image/images/spot/';

function SpotsContainer({spotList, loadMore}: Props) {
  const flatListRef = useRef(null);
  // const toTop = () => {
  //   flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
  // }

  const renderEmpty = () => (
    <View style={styles.emptyText}>
      <Text>데이터가 없습니다.</Text>
    </View>
  );

  const getRandomPictureNum = (min: number, max: number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  };

  return (
    <FlatList
      ref={flatListRef}
      data={spotList}
      numColumns={2}
      style={{marginTop: 10}}
      columnWrapperStyle={styles.row}
      keyExtractor={(item, idx) => idx.toString()}
      windowSize={30}
      contentContainerStyle={{paddingBottom: 250}}
      renderItem={({item}) => (
        <ScrollView key={item.spotId} style={styles.container}>
          <View style={styles.imgContainer}>
            <Squre
              width={130}
              height={130}
              borderRadius={5}
              imageSource={
                item.imgCnt != 0
                  ? SPOT_IMG_URL + item.spotId + '/0.jpg'
                  : SPOT_IMG_URL + 'default/default.png'
              }
            />
          </View>

          <View style={styles.descContainer}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
              {spotList.indexOf(item) + 1}. {item.name}
            </Text>
            <Text style={[styles.star, styles.right]}>
              {item.star ? item.star.toString().slice(0, 3) : '0.0'}
            </Text>
          </View>
          <View style={[styles.descContainer, styles.right]}></View>
          <View style={styles.descContainer}>
            <Text style={styles.desc}>동작/사당</Text>
            <Text style={styles.reviewContainer}>
              <Pencil width={10} height={10} fill={'black'} stroke={'black'} />
              {item.reviewCnt}
            </Text>
          </View>
        </ScrollView>
      )}
      ListEmptyComponent={renderEmpty}
      onEndReachedThreshold={0.2}
      onEndReached={() => loadMore()}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingBottom: 15,
    width: '100%',
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
  },
  imgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
    paddingTop: 5,
    width: '80%',
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
    justifyContent: 'flex-end',
  },
  star: {
    paddingTop: 5,
    fontSize: 12,
    fontWeight: '500',
  },
  reviewContainer: {
    paddingHorizontal: 10,
  },
  emptyText: {
    paddingVertical: 20,
    alignItems: 'center',
    fontSize: 12,
    fontWeight: '500',
  },
});

export default SpotsContainer;
