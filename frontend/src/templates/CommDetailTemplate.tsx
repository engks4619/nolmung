import React from 'react';
import {View} from 'react-native';
import DetailSubject from '@organisms/DetailSubject';
import DetailDogs from '@organisms/DetailDogs';
import DetailWalk from '@organisms/DetailWalk';
import DetailContent from '@organisms/DetailContent';
import DetailFooter from '@organisms/DetailFooter';
import {DetailProps} from '@pages/CommDetail';

interface Props {
  detailContent: DetailProps;
}

function CommDetailTemplate({detailContent}: Props) {
  return (
    <View>
      <DetailSubject
        subject={detailContent.subject}
        writer={detailContent.writer}
        modifyDate={detailContent.modifyDate}
      />
      <DetailDogs />
      {/* <DetailWalk
        location={detailContent.location}
        walkDate={detailContent.walkDate}
        leadLine={detailContent.leadLine}
        poopBag={detailContent.poopBag}
      /> */}
      <DetailContent />
      <DetailFooter />
    </View>
  );
}

export default CommDetailTemplate;
