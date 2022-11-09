import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native';
import {otherPostListType} from '@pages/Community';
import Squre from '@atoms/Squre';
import CommUserInfo from '@molecules/CommUserInfo';
import CommMainInfo from '@molecules/CommMainInfo';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CommunityParamList} from '@pages/Community';
import {useNavigation} from '@react-navigation/native';

interface Props {
  otherPostList: otherPostListType[];
  loadMore: () => void;
}
type CommScreenProp = NativeStackNavigationProp<
  CommunityParamList,
  'Community'
>;

function CommOtherPost({otherPostList, loadMore}: Props) {
  const navigation = useNavigation<CommScreenProp>();

  const naviOtherDetail = (postIdx: number) => {
    navigation.navigate('CommDetail', {postIdx});
  };

  return (
    <FlatList
      data={otherPostList}
      keyExtractor={item => String(item.postIdx)}
      contentContainerStyle={{paddingBottom: 100}}
      renderItem={({item}) => (
        <TouchableHighlight
          onPress={() => naviOtherDetail(item.postIdx)}
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
              <Text style={styles.payText}>￦ {item.pay}원</Text>
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
    height: 125,
    backgroundColor: 'white',
    marginBottom: 4,
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
    color: 'rgba(0, 0, 0, 0.7)',
    fontWeight: '800',
  },
});

export default CommOtherPost;
