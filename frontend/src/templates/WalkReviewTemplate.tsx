import React, {Dispatch, SetStateAction, useEffect} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {MAIN_COLOR} from '~/const';
import ChatInfoSummary from '~/organisms/ChatInfoSummary';
import ReviewArticleSummary from '~/organisms/ReviewArticleSummary';
import StarContainer from '~/organisms/StarContainer';

interface Props {
  star: number;
  setStar: Dispatch<SetStateAction<number>>;
  article: any;
  chatInfo: any;
}

const WalkReviewTemplate = ({star, setStar, article, chatInfo}: Props) => {
  useEffect(() => {
    console.log(star);
  }, [star]);

  return (
    <ScrollView style={styles.container}>
      <ReviewArticleSummary article={article} />
      <ChatInfoSummary chatInfo={chatInfo} />
      <StarContainer star={star} setStar={setStar} />
      <View style={styles.textContainer}>
        <TextInput
          multiline={true}
          numberOfLines={8}
          style={styles.textInput}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  textContainer: {
    marginHorizontal: 20,
    marginVertical: 20,
    backgroundColor: 'rgb(243,237,237)',
    borderWidth: 1,
    borderColor: MAIN_COLOR,
  },
  textInput: {
    paddingHorizontal: 20,
  },
});

export default WalkReviewTemplate;
