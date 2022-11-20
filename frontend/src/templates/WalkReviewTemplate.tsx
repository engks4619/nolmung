import React, {Dispatch, SetStateAction} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {BORDER_COLOR, MAIN_COLOR, TEXT_INPUT_BACKGROUND_COLOR} from '~/const';
import ChatInfoSummary from '~/organisms/ChatInfoSummary';
import ReviewArticleSummary from '~/organisms/ReviewArticleSummary';
import StarContainer from '~/organisms/StarContainer';
import TextInputBox from '@atoms/TextInputBox';
import {article} from '~/utils/type';
import StarRating from '~/molecules/StarRating';
import CustomRatingBar from '@atoms/CustomRatingBar';

interface Props {
  star: number;
  setStar: Dispatch<SetStateAction<number>>;
  article: article | null;
  chatInfo: any;
  review: string;
  setReview: Dispatch<SetStateAction<string>>;
}

const WalkReviewTemplate = ({
  star,
  setStar,
  article,
  chatInfo,
  review,
  setReview,
}: Props) => {
  return (
    <ScrollView style={styles.container}>
      <ReviewArticleSummary article={article} />
      <ChatInfoSummary chatInfo={chatInfo} />
      <CustomRatingBar
        width={40}
        height={40}
        defaultRating={star}
        setDefaultRating={setStar}
      />
      <View style={styles.textInputContainer}>
        <TextInputBox
          content={review}
          setContent={setReview}
          borderColor={BORDER_COLOR}
        />
      </View>
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
  textInputContainer: {
    marginVertical: 20,
    marginHorizontal: 20,
  },
});

export default WalkReviewTemplate;
