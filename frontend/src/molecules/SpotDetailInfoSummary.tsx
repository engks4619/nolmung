import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {BORDER_COLOR, FONT_SIZE_M, FONT_SIZE_S, MAIN_COLOR} from '~/const';
import {spot} from '~/utils/type';

interface Props {
  spot: spot;
}

function SpotDetailInfoSummary({spot}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.text}>공간 정보</Text>
      </View>
      <View style={styles.descContainer}>
        <View style={styles.hContainer}>
          <View style={styles.left}>
            <Text style={styles.text}>상호</Text>
          </View>
          <View style={styles.right}>
            <Text style={styles.text}>{spot?.name}</Text>
          </View>
        </View>
        <View style={styles.hContainer}>
          <View style={styles.left}>
            <Text style={styles.text}>태그</Text>
          </View>
          <View style={styles.right}>
            <View style={styles.tagContainer}>
              {spot?.descList.map((item, idx) => (
                <View style={styles.border} key={idx}>
                  <Text style={styles.text}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
        <View style={styles.hContainer}>
          <View style={styles.left}>
            <Text style={styles.text}>영업시간</Text>
          </View>
          <View style={styles.right}>
            {Object.keys(spot?.time ?? {}).map((key: string, idx: number) => {
              return (
                <View style={styles.itemContainer} key={idx}>
                  <View style={styles.itemHContainer}>
                    <View style={styles.left}>
                      <Text style={styles.text}>{key}</Text>
                    </View>
                    <View>
                      <Text style={styles.text}>{spot.time[key]}</Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
        <View style={styles.hContainer}>
          <View style={styles.left}>
            <Text style={styles.text}>메뉴</Text>
          </View>
          <View style={styles.right}>
            {Object.keys(spot?.menu ?? {}).map((key: string, idx: number) => {
              return (
                <View style={styles.itemContainer} key={idx}>
                  <View style={styles.itemHContainer}>
                    <View style={styles.left}>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={styles.text}>
                        {key}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.text}>{spot.menu[key]}</Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  itemContainer: {
    width: '100%',
    flexDirection: 'column',
  },
  itemHContainer: {
    paddingVertical: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tagContainer: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
  },
  head: {
    borderBottomWidth: 1,
    borderBottomColor: BORDER_COLOR,
    paddingVertical: 5,
  },
  text: {
    color: 'black',
    fontSize: FONT_SIZE_S,
  },
  descContainer: {
    marginTop: 2,
    width: '100%',
  },
  hContainer: {
    marginVertical: 3,
    flexDirection: 'row',
  },
  left: {
    flex: 1,
  },
  right: {
    flex: 4,
  },
  border: {
    borderWidth: 1.5,
    borderColor: MAIN_COLOR,
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginRight: 4,
    marginTop: 4,
  },
});
export default SpotDetailInfoSummary;
