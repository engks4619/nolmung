import React from 'react';
import {View, FlatList, StyleSheet, Text} from 'react-native';
import {otherPostListType} from '@pages/Community';
import Squre from '@atoms/Squre';
import CommUserInfo from '@molecules/CommUserInfo';
import CommMainInfo from '@molecules/CommMainInfo';

interface Props {
  otherPostList: otherPostListType[];
  loadMore: () => void;
}

function CommOtherPost({otherPostList, loadMore}: Props) {
  return (
    <FlatList
      data={otherPostList}
      keyExtractor={item => String(item.postIdx)}
      renderItem={({item}) => (
        <View style={styles.container}>
          <View style={styles.imgContainer}>
            <Squre imageSource={item.thumbnailUrl} width={110} height={110} />
          </View>
          <View style={styles.infoContainer}>
            <CommMainInfo
              subject={item.subject}
              walkDate={item.walkDate}
              location={item.location}
              modifyDate={item.modifyDate}
            />
            <Text style={styles.payText}>￦{item.pay}원</Text>
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
    height: 125,
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
  payText: {
    fontWeight: 'bold',
  },
});

export default CommOtherPost;
