import React, {useEffect, useRef} from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Pressable,
} from 'react-native';
import Squre from '~/atoms/Squre';
import {Spot, SpotRequest} from '~/pages/Spots';
import Pencil from '@assets/pencil.svg';
import {getTextAddress} from '~/utils/addressService';
import {AxiosResponse} from 'axios';

interface Props {
  spotList: Spot[];
  spotRequest: SpotRequest | null;
  page: number;
  sort: number;
  limitDistance: number;
  category: string;
  loadMore: Function;
  navigation: any;
}

function SpotsContainer({
  spotList,
  spotRequest,
  page,
  sort,
  limitDistance,
  category,
  loadMore,
  navigation,
}: Props) {
  const flatListRef = useRef<FlatList>(null);

  const toTop = () => {
    flatListRef.current?.scrollToOffset({animated: true, offset: 0});
  };

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

  const getStringStar = (star: number): string => {
    if (!star) {
      return '0.0';
    }
    if (star.toString().length == 1) {
      return star.toString() + '.0';
    }
    return star.toString().slice(0, 3);
  };

  const getSimpleAddress = (address: string): string => {
    const arr = address.split(' ');
    arr?.shift();
    if (arr[0].charAt(arr[0].length - 1) === '시') {
      arr?.shift();
    }
    while (arr.length > 2) {
      arr.pop();
    }
    return arr.join(' ');
  };

  const spotDetailNavigate = (spotId: string) => {
    navigation.navigate('SpotDetail', spotId);
  };

  useEffect(() => {
    if (page !== 0) {
      toTop();
    }
  }, [spotRequest, sort, limitDistance, category]);

  return (
    <FlatList
      ref={flatListRef}
      data={spotList}
      numColumns={2}
      columnWrapperStyle={styles.row}
      keyExtractor={(item, idx) => idx.toString()}
      windowSize={30}
      contentContainerStyle={{paddingBottom: 220}}
      renderItem={({item}) => (
        <View key={item.spotId} style={styles.container}>
          <Pressable onPress={() => spotDetailNavigate(item.spotId)}>
            <View style={styles.imgContainer}>
              <Squre
                width={130}
                height={130}
                borderRadius={5}
                imageSource={
                  item.imgCnt !== 0
                    ? `/images/spot/${item.spotId}/0.jpg`
                    : `/images/spot/default/default.png`
                }
              />
            </View>

            <View style={styles.descContainer}>
              <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
                {spotList.indexOf(item) + 1}. {item.name}
              </Text>
              <Text style={[styles.star, styles.right]}>
                {getStringStar(item.star)}
              </Text>
            </View>
            <View style={styles.descContainer}>
              <Text numberOfLines={1} ellipsizeMode="tail" style={styles.desc}>
                {getSimpleAddress(item.address)}
              </Text>
              <Text style={styles.reviewContainer}>
                <Pencil
                  width={10}
                  height={10}
                  fill={'black'}
                  stroke={'black'}
                />
                {item.reviewCnt}
              </Text>
            </View>
          </Pressable>
        </View>
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
    maxWidth: '50%',
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
  },
  imgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
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
    fontSize: 14,
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
