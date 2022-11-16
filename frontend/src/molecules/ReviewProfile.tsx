import React from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import Profile from '~/atoms/Profile';
import {MAIN_COLOR} from '~/const';
import {reviewerType} from '@pages/Oppent';

interface Props {
  ptReviewsNum: number;
  ownerReviews: number;
  oppentInfo: reviewerType;
  isOwner: boolean;
  setIsOwner: React.Dispatch<React.SetStateAction<boolean>>;
}

function ReviewProfile({
  isOwner,
  ptReviewsNum,
  ownerReviews,
  oppentInfo,
  setIsOwner,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Profile
          imageSource={oppentInfo?.profileImage}
          width={50}
          height={50}
        />
        <Text style={styles.nameStyle}>{oppentInfo?.nickname}</Text>
      </View>
      <View style={styles.reviewContainer}>
        <Pressable
          style={
            isOwner
              ? styles.selectContainer
              : [styles.selectContainer, styles.active]
          }
          onPress={() => setIsOwner(!isOwner)}>
          <Text style={styles.infoStyle}>알바후기</Text>
          <Text style={styles.numberStyle}>{ptReviewsNum}</Text>
        </Pressable>
        <Pressable
          style={
            isOwner
              ? [styles.selectContainer, styles.active]
              : styles.selectContainer
          }
          onPress={() => setIsOwner(!isOwner)}>
          <Text style={styles.infoStyle}>견주후기</Text>
          <Text style={styles.numberStyle}>{ownerReviews}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 15,
    paddingBottom: 15,
    justifyContent: 'space-between',
    borderBottomColor: 'rgba(0, 0, 0, .5)',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  reviewContainer: {
    flexDirection: 'row',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 15,
    marginHorizontal: 5,
    paddingLeft: 10,
    paddingRight: 5,
    borderColor: '#f0f0f0',
    backgroundColor: '#f0f0f0',
  },
  active: {
    backgroundColor: 'white',
    borderColor: MAIN_COLOR,
  },
  nameStyle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 10,
  },
  infoStyle: {
    fontSize: 13,
    color: 'black',
  },
  numberStyle: {
    marginHorizontal: 5,
    color: MAIN_COLOR,
    fontWeight: '700',
  },
});

export default ReviewProfile;
