import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BORDER_COLOR, FONT_SIZE_S, MAIN_COLOR} from '~/const';
import HContainer from '~/molecules/HContainer';
import SpaceBetweenContainer from '~/molecules/SpaceBetweenContainer';
import {spot} from '~/utils/type';

interface Props {
  spot: spot | null;
}

function SpotDetailInfoSummary({spot}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.text}>공간 정보</Text>
      </View>
      <View style={styles.descContainer}>
        {spot?.descList ? (
          <HContainer
            left="태그"
            right={
              <View style={styles.tagContainer}>
                {spot?.descList.map((item, idx) => (
                  <View style={styles.border} key={idx}>
                    <Text style={styles.text}>{item}</Text>
                  </View>
                ))}
              </View>
            }
          />
        ) : null}

        {spot?.time ? (
          <HContainer
            left="영업시간"
            right={Object.keys(spot?.time ?? {}).map(
              (key: string, idx: number) => {
                return (
                  <View style={styles.itemContainer} key={idx}>
                    <SpaceBetweenContainer left={key} right={spot.time[key]} />
                  </View>
                );
              },
            )}
          />
        ) : null}
        {spot?.menu ? (
          <HContainer
            left="메뉴"
            right={Object.keys(spot?.menu ?? {}).map(
              (key: string, idx: number) => {
                return (
                  <View style={styles.itemContainer} key={idx}>
                    <SpaceBetweenContainer left={key} right={spot.menu[key]} />
                  </View>
                );
              },
            )}
          />
        ) : null}
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
