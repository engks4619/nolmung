import React from 'react';
import {View, StyleSheet} from 'react-native';
import DetailSubject from '@organisms/DetailSubject';
import DetailDogs from '@organisms/DetailDogs';
import DetailWalk from '@organisms/DetailWalk';
import DetailContent from '@organisms/DetailContent';
import DetailFooter from '@organisms/DetailFooter';
import {DetailProps} from '@pages/CommDetail';

interface Props {
  detailContent: DetailProps;
  isLiked: Boolean;
  putLike: () => void;
}

function CommDetailTemplate({detailContent, isLiked, putLike}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <DetailSubject
          subject={detailContent.subject}
          writer={detailContent.writer}
          writerIdx={detailContent.writerIdx}
          modifyDate={detailContent.modifyDate}
          userImgUrl={detailContent.userImgUrl}
        />
        <DetailDogs dogInfoList={detailContent.dogInfoList} />
        <DetailWalk
          location={detailContent.location}
          walkDate={detailContent.walkDate}
          leadLine={detailContent.leadLine}
          poopBag={detailContent.poopBag}
        />
        <DetailContent
          content={detailContent.content}
          photoUrl={detailContent.photoUrl}
        />
      </View>
      <DetailFooter
        categoryType={detailContent.categoryType}
        pay={detailContent.pay}
        isLiked={isLiked}
        putLike={putLike}
        isWriter={true} // login 기능 추가후 비교
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CommDetailTemplate;
