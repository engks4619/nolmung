import React, {useState} from 'react';
import {View} from 'react-native';
import CommunityTemplate from '@templates/CommunityTemplate';

function Community() {
  const [categoryType, setCategoryType] = useState('WITH');

  const navigateWithPg = () => {
    setCategoryType('WITH');
  };

  const navigateOtherPg = () => {
    setCategoryType('OTHER');
  };

  return (
    <View>
      <CommunityTemplate
        navigateWithPg={navigateWithPg}
        navigateOtherPg={navigateOtherPg}
        categoryType={categoryType}
      />
    </View>
  );
}

export default Community;
