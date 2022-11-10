import React from 'react';
import {View, StyleSheet, FlatList, TouchableHighlight} from 'react-native';
import CommMainInfo from '@molecules/CommMainInfo';
import Squre from '@atoms/Squre';
import CommUserInfo from '@molecules/CommUserInfo';
import {withPostListType} from '~/pages/Community';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CommunityParamList} from '@pages/Community';
import {useNavigation} from '@react-navigation/native';

interface Props {
  withPostList: withPostListType[];
  loadMore: () => void;
}
type CommScreenProp = NativeStackNavigationProp<
  CommunityParamList,
  'Community'
>;

function CommWithPost({withPostList, loadMore}: Props) {
  const navigation = useNavigation<CommScreenProp>();

  const naviWithDetail = (postIdx: number) => {
    navigation.navigate('CommDetail', {postIdx});
  };

  return (
    <FlatList
      data={withPostList}
      keyExtractor={item => String(item.postIdx)}
      contentContainerStyle={{paddingBottom: 100}}
      renderItem={({item}) => (
        <TouchableHighlight
          onPress={() => naviWithDetail(item.postIdx)}
          underlayColor="#E2E2E2">
          <View style={styles.container}>
            <View style={styles.imgContainer}>
              <Squre
                imageSource={item.thumbnailUrl}
                width={85}
                height={85}
                borderRadius={5}
              />
            </View>
            <View style={styles.infoContainer}>
              <CommMainInfo
                subject={item.subject}
                walkDate={item.walkDate}
                location={item.location}
                modifyDate={item.modifyDate}
              />
              <CommUserInfo
                writer={item.writer}
                likeCnt={item.likeCnt}
                userImgUrl={item.userImgUrl}
              />
            </View>
          </View>
        </TouchableHighlight>
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
    marginBottom: 4,
    paddingHorizontal: 13,
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
