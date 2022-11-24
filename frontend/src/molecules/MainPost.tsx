import React from 'react';
import {View, Text, StyleSheet, Dimensions, Pressable} from 'react-native';
import {MAIN_COLOR} from '~/const';
import Heart from '@assets/heart.svg';
import Chat from '@assets/chat.svg';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CommunityParamList} from '@pages/Community';
import {useNavigation} from '@react-navigation/native';

interface postInfo {
  categoryType: string;
  postIdx: number;
  subject: string;
  chatCnt: number;
}

interface Props {
  mainPosts: postInfo[];
  mainPostPgNum: number;
}

type CommScreenProp = NativeStackNavigationProp<
  CommunityParamList,
  'Community'
>;

const WIDTH = Dimensions.get('window').width;

function MainPost({mainPosts, mainPostPgNum}: Props) {
  const navigation = useNavigation<CommScreenProp>();

  const naviWithDetail = (postIdx: number) => {
    navigation.navigate('CommunityList', {
      screen: 'CommDetail',
      params: {postIdx},
    });
  };

  return (
    <View style={styles.fullWidth}>
      {mainPosts.map((post, idx: number) => (
        <View key={idx}>
          <Pressable onPress={() => naviWithDetail(post.postIdx)}>
            <Text style={styles.categoryContainer}>
              {post.categoryType === 'OTHER' ? '돌봐줘요' : '함께 가요'}
            </Text>
            <View style={styles.postContainer}>
              <View style={styles.indexContainer}>
                <Text style={styles.colored}>
                  {mainPostPgNum * 5 + idx + 1}.
                </Text>
              </View>
              <View style={styles.contentContainer}>
                <Text
                  style={styles.headingText}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {post.subject}
                </Text>
              </View>
              <View style={styles.svgContainer}>
                <View>
                  <Chat width={13} height={13} fill={'black'} />
                </View>
                <View>
                  <Text style={styles.svgMargin}>{post.chatCnt}</Text>
                </View>
              </View>
            </View>
          </Pressable>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  fullWidth: {
    paddingHorizontal: 15,
    width: WIDTH,
  },
  postContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 2,
    marginBottom: 5,
    paddingBottom: 7,
    borderBottomWidth: 0.8,
    borderColor: 'rgba(0, 0, 0, .2)',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  indexContainer: {
    flex: 1.1,
  },
  colored: {
    color: MAIN_COLOR,
    fontWeight: 'bold',
    fontSize: 14,
  },
  categoryContainer: {
    marginLeft: 25,
    fontSize: 11,
  },
  headingText: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
    // height: 17,
    // width: 270,
  },
  contentContainer: {
    flex: 15,
    marginLeft: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  svgContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  svgMargin: {
    flex: 1,
    marginHorizontal: 3,
  },
});

export default MainPost;
