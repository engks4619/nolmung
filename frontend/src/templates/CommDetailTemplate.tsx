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
  userIdx: number;
}

function CommDetailTemplate({detailContent, userIdx}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <DetailSubject
          subject={detailContent.subject}
          writer={detailContent.writer}
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
        isLiked={detailContent.getLike}
        isWriter={detailContent.writerIdx === userIdx}
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
