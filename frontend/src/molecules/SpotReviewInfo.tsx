import React from 'react';
import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import Profile from '~/atoms/Profile';
import Squre from '~/atoms/Squre';
import {BORDER_COLOR, FONT_SIZE_S} from '~/const';
import {RootState} from '~/store/reducer';
import {review} from '~/utils/type';

interface Props {
  review: review;
  deleteSpotReview: (reviewIdx: number) => void;
}

const getStringStar = (star: number): string => {
  if (!star) {
    return '0.0';
  }
  if (star.toString().length == 1) {
    return star.toString() + '.0';
  }
  return star.toString().slice(0, 3);
};

const screenWidth = Dimensions.get('window').width;

function SpotReviewInfo({review, deleteSpotReview}: Props) {
  const userIdx = useSelector((state: RootState) => state.user.userIdx);
  return (
    <View style={styles.container}>
      <View style={styles.hContainer}>
        <View style={styles.hContainer}>
          <Profile imageSource={review.profileImage} width={30} height={30} />
          <Text style={styles.nickname}>{review.nickname}</Text>
        </View>
        <View>
          <Text style={styles.text}>{getStringStar(review.star)}</Text>
        </View>
      </View>
      {review.userIdx === parseInt(userIdx) ? (
        <View style={styles.deleteContainer}>
          <Pressable onPress={() => deleteSpotReview(review.reviewIdx)}>
            <Text style={styles.delete}>삭제</Text>
          </Pressable>
        </View>
      ) : null}
      <View style={styles.contentContainer}>
        <Text style={styles.text}>{review.content}</Text>
      </View>
      <FlatList
        data={review.photoList}
        horizontal
        keyExtractor={item => item}
        showsHorizontalScrollIndicator={false}
        renderItem={item => (
          <View style={styles.imgContainer}>
            <Squre
              imageSource={review.photoList[item.index]}
              width={screenWidth * 0.9}
              height={200}
              borderRadius={3}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    borderBottomColor: BORDER_COLOR,
    borderBottomWidth: 1,
  },
  hContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    color: 'black',
    fontSize: FONT_SIZE_S,
  },
  nickname: {
    color: 'black',
    fontSize: FONT_SIZE_S,
    fontWeight: '500',
    marginLeft: 10,
  },
  contentContainer: {
    paddingVertical: 20,
  },
  imgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  deleteContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginTop: 5,
  },
  delete: {
    fontSize: 10,
  },
});
export default SpotReviewInfo;
