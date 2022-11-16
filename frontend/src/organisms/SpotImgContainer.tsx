import React from 'react';
import {Dimensions, FlatList, View} from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);
const offset = 15;
const gap = 15;
const pageWidth = screenWidth - (15 + 15) * 2;

interface Props {
  imgCnt: number;
}

const SpotImgContainer = ({imgCnt}: Props) => {
  return (
    <FlatList
      contentContainerStyle={{
        paddingHorizontal: (offset + gap) / 4,
      }}
      data={['', '']}
      decelerationRate="fast"
      snapToInterval={pageWidth + gap}
      snapToAlignment="start"
      horizontal
      showsHorizontalScrollIndicator={true}
      keyExtractor={(item, idx) => String(idx)}
      renderItem={(item) =>(<View></View>)}
    />
  );
};

export default SpotImgContainer;
