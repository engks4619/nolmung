import React, {Dispatch, SetStateAction} from 'react';
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
  refreshing: boolean;
  setRefreshing: Dispatch<SetStateAction<boolean>>;
  refresh: (pgNum: number, isRefresh?: boolean) => void;
}
type CommScreenProp = NativeStackNavigationProp<
  CommunityParamList,
  'Community'
>;

function CommWithPost({
  withPostList,
  loadMore,
  refreshing,
  setRefreshing,
  refresh,
}: Props) {
  const navigation = useNavigation<CommScreenProp>();

  const naviWithDetail = (postIdx: number) => {
    navigation.navigate('CommDetail', {postIdx});
  };

  const onRefresh = () => {
    if (!refreshing) {
      refresh(0, true);
    }
  };

  return (
    <FlatList
      data={withPostList}
      onRefresh={onRefresh}
      refreshing={refreshing}
      keyExtractor={item => String(item.postIdx)}
      renderItem={({item}) => (
        <TouchableHighlight
          onPress={() => naviWithDetail(item.postIdx)}
          underlayColor="#E2E2E2"
          style={styles.fullContainer}>
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
                location={item.location}
                modifyDate={item.modifyDate}
              />
              <CommUserInfo
                writer={item.writer}
                userImgUrl={item.userImgUrl}
                chatCnt={item.chatCnt}
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
  fullContainer: {
    backgroundColor: 'white',
    marginTop: 2,
  },
  container: {
    flexDirection: 'row',
    height: 110,
    marginBottom: 4,
    marginHorizontal: 15,
  },
  imgContainer: {
    justifyContent: 'center',
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 10,
    marginVertical: 11,
    height: 85,
    justifyContent: 'space-between',
  },
});

export default CommWithPost;
