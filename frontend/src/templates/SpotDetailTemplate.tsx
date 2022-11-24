import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Loading from '~/atoms/Loading';
import MyButton from '~/atoms/MyButton';
import SpotImgContainer from '~/organisms/SpotImgContainer';
import SpotInfoContainer from '~/organisms/SpotInfoContainer';
import SpotReviewContainer from '~/organisms/SpotReviewContainer';
import {SpotDetailParamList} from '~/pages/Spots';
import {review, spot} from '~/utils/type';

interface Props {
  spot: spot | null;
  reviewList: review[] | null;
  textAddress: string;
  deleteSpotReview: (reviewIdx: number) => void;
  loading: boolean;
}

type CommScreenProp = NativeStackNavigationProp<
  SpotDetailParamList,
  'SpotRegistReview'
>;

const SpotDetailTemplate = ({
  spot,
  reviewList,
  textAddress,
  deleteSpotReview,
  loading,
}: Props) => {
  const navigation = useNavigation<CommScreenProp>();

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView style={styles.container} overScrollMode="never">
          <SpotImgContainer
            spotId={spot?.spotId ?? ''}
            imgCnt={spot?.imgCnt ?? 0}
          />
          <SpotInfoContainer spot={spot} textAddress={textAddress} />
          <View style={styles.btnContainer}>
            <MyButton
              btnText="리뷰 작성"
              width={100}
              height={30}
              fontSize={11}
              onClick={() => {
                navigation.navigate('SpotRegistReview', {
                  spotId: spot?.spotId ?? '',
                  spotName: spot?.name ?? '',
                });
              }}
            />
          </View>
          <SpotReviewContainer
            reviewList={reviewList}
            deleteSpotReview={deleteSpotReview}
          />
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  btnContainer: {
    paddingVertical: 10,
    alignItems: 'flex-end',
    marginRight: 20,
  },
});

export default SpotDetailTemplate;
