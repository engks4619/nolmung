import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Squre from '~/atoms/Squre';
import {BORDER_COLOR} from '~/const';
import {article} from '~/utils/type';

interface Props {
  article: article | null;
}

const ReviewArticleSummary = ({article}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.hContainer}>
        <View style={styles.imgContainer}>
          <Squre
            imageSource={
              article
                ? article?.photoUrl
                  ? article?.photoUrl[0]
                  : article?.dogInfoList[0]?.image
                : `/images/spot/default/default.png`
            }
            width={75}
            height={75}
            borderRadius={5}
          />
        </View>
        <View style={styles.descContainer}>
          <View style={styles.descTextContainer}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.descText}>
              {article?.subject}
            </Text>
          </View>
          <View style={styles.descTextContainer}>
            {article?.pay ? (
              <Text style={styles.descText}>
                {article?.pay.toLocaleString()} 원
              </Text>
            ) : null}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  hContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomColor: BORDER_COLOR,
    borderBottomWidth: 1,
  },
  imgContainer: {
    justifyContent: 'center',
  },
  descContainer: {
    justifyContent: 'center',
  },
  descTextContainer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  descText: {
    fontSize: 15,
    fontWeight: '800',
    color: 'black',
  },
});
export default ReviewArticleSummary;
