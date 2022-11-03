import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import CommMainInfo from '@molecules/CommMainInfo';
import Squre from '@atoms/Squre';
import CommUserInfo from '@molecules/CommUserInfo';
import {withPostListType} from '~/pages/Community';

interface Props {
  withPostList: withPostListType[];
  loadMore: () => void;
}

function CommWithPost({withPostList, loadMore}: Props) {
  return (
    <FlatList
      data={withPostList}
      keyExtractor={item => String(item.postIdx)}
      renderItem={({item}) => (
        <View style={styles.container}>
          <View style={styles.imgContainer}>
            <Squre imageSource={item.thumbnailUrl} />
          </View>
          <View style={styles.infoContainer}>
            <CommMainInfo
              subject={item.subject}
              walkDate={item.walkDate}
              location={item.location}
              modifyDate={item.modifyDate}
            />
            <CommUserInfo writer={item.writer} likeCnt={item.likeCnt} />
          </View>
        </View>
      )}
      onEndReached={() => loadMore()}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 110,
    backgroundColor: 'white',
    marginBottom: 2,
    paddingHorizontal: 7,
  },
  imgContainer: {
    justifyContent: 'center',
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'column',
    padding: 5,
    justifyContent: 'space-between',
  },
});

export default CommWithPost;
