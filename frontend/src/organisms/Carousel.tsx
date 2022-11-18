import React from 'react';
import {FlatList, Pressable, View} from 'react-native';

interface Props {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  gap: number;
  offset: number;
  RenderItem: ({page, item}: {page: number; item: any}) => JSX.Element;
  pageWidth: number;
  data: any[];
  pressFunc?: (param: any) => void;
}

const Carousel = ({
  gap,
  offset,
  RenderItem,
  pageWidth,
  data,
  page,
  setPage,
  pressFunc,
}: Props) => {
  const onScroll = (e: any) => {
    const newPage = Math.round(
      e.nativeEvent.contentOffset.x / (pageWidth + gap),
    );
    setPage(newPage);
  };
  return (
    <View style={{flexDirection: 'row'}}>
      <FlatList
        contentContainerStyle={{
          paddingHorizontal: (offset + gap) / 4,
        }}
        onScroll={onScroll}
        decelerationRate="fast"
        snapToInterval={pageWidth + gap}
        snapToAlignment="start"
        pagingEnabled
        horizontal
        keyExtractor={(item, idx) => String(idx)}
        data={data}
        renderItem={({item}) => (
          <Pressable
            onPress={
              pressFunc ? () => pressFunc(data.indexOf(item)) : () => {}
            }>
            <View style={{marginHorizontal: gap / 2}}>
              <RenderItem page={page} item={item} />
            </View>
          </Pressable>
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default Carousel;
