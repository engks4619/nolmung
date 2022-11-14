import React, {Dispatch, SetStateAction, useEffect} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {MAIN_COLOR} from '~/const';
import ChatInfoSummary from '~/organisms/ChatInfoSummary';
import ReviewArticleSummary from '~/organisms/ReviewArticleSummary';
import StarContainer from '~/organisms/StarContainer';
import TextInputBox from '@atoms/TextInputBox';

interface Props {
  star: number;
  setStar: Dispatch<SetStateAction<number>>;
  article: any;
  chatInfo: any;
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
}

const WalkReviewTemplate = ({
  star,
  setStar,
  article,
  chatInfo,
  content,
  setContent,
}: Props) => {
  useEffect(() => {
    console.log(star);
  }, [star]);

  return (
    <ScrollView style={styles.container}>
      <ReviewArticleSummary article={article} />
      <ChatInfoSummary chatInfo={chatInfo} />
      <StarContainer star={star} setStar={setStar} />
      <TextInputBox
        content={content}
        setContent={setContent}
        borderColor={MAIN_COLOR}
        backgroundColor={'rgb(243,237,237)'}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  textInput: {
    paddingHorizontal: 20,
  },
});

export default WalkReviewTemplate;
