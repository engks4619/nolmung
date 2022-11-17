import React from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import Profile from '~/atoms/Profile';
import {FONT_SIZE_L, FONT_SIZE_M, FONT_SIZE_S, MAIN_COLOR} from '~/const';
import {review} from '~/utils/type';

interface Props {
  reviewList: review[] | null;
}

const renderEmpty = () => {
  return (
    <View>
      <Text>작성된 리뷰가 없습니다.</Text>
    </View>
  );
};

function SpotReviewContainer({reviewList}: Props) {
  return (
    <View>
      <View style={styles.grayBox}>
        <Text style={styles.brown}>리뷰</Text>
      </View>
      <View style={styles.container}>
        {reviewList && reviewList?.length > 0 ? (
          <FlatList
            data={reviewList}
            keyExtractor={(item, idx) => String(idx)}
            renderItem={({item}) => (
              <View>
                <View style={styles.hContainer}>
                  <View>
                    <Profile
                      imageSource={item.profileImage}
                      width={30}
                      height={30}
                    />
                    <Text style={styles.nickname}>{item.nickname}</Text>
                  </View>
                  <View>
                    <Text>{item.star}</Text>
                  </View>
                </View>
                <Text style={styles.text}>{item.content}</Text>
              </View>
            )}
          />
        ) : (
          renderEmpty()
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  hContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  grayBox: {
    marginVertical: 10,
    backgroundColor: 'EEEEEE',
    paddingVertical: 5,
    alignItems: 'center',
  },
  brown: {
    color: MAIN_COLOR,
    fontSize: FONT_SIZE_M,
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
});

export default SpotReviewContainer;
