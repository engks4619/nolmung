import React from 'react';
import {View} from 'react-native';
import CommunityTab from '@organisms/CommunityTab';

export interface CommunityTabType {
  navigateWithPg: () => void;
  navigateOtherPg: () => void;
  categoryType: string;
}

interface Props extends CommunityTabType {}

function CommunityTemplate({
  navigateWithPg,
  navigateOtherPg,
  categoryType,
}: Props) {
  return (
    <View>
      <CommunityTab
        navigateWithPg={navigateWithPg}
        navigateOtherPg={navigateOtherPg}
        categoryType={categoryType}
      />
    </View>
  );
}

export default CommunityTemplate;
