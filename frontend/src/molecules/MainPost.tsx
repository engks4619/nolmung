import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {MAIN_COLOR} from '~/const';

interface postInfo {
  categoryType: string;
  postIdx: number;
  subject: string;
}

interface Props {
  mainPosts: postInfo[];
  mainPostPgNum: number;
}

const WIDTH = Dimensions.get('window').width;

function MainPost({mainPosts, mainPostPgNum}: Props) {
  return (
    <View style={styles.fullWidth}>
      {mainPosts.map((post, idx: number) => (
        <View style={styles.postContainer} key={idx}>
          <Text style={styles.colored}>{mainPostPgNum * 5 + idx + 1}.</Text>
          <View style={styles.contentContainer}>
            <Text style={styles.headingText}>
              {post.subject.length < 23
                ? post.subject
                : post.subject.slice(0, 16) + '...'}
            </Text>
            <Text>
              {post.categoryType === 'OTHER' ? '#돌봐줘요' : '#함께 가요'}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  fullWidth: {
    width: WIDTH,
  },
  postContainer: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderStyle: 'dashed',
  },
  colored: {
    flex: 2,
    color: MAIN_COLOR,
    fontWeight: 'bold',
    fontSize: 20,
  },
  headingText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default MainPost;
