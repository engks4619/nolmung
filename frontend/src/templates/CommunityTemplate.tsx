import React from 'react';
import {
  Pressable,
  View,
  StyleSheet,
  Button,
  Text,
  TouchableOpacity,
} from 'react-native';
import CommunityTab from '@organisms/CommunityTab';
import CommWithPost from '@organisms/CommWithPost';
import CommOtherPost from '@organisms/CommOtherPost';
import {withPostListType, otherPostListType} from '@pages/Community';
import EditBtn from '@molecules/EditBtn';

export interface CommunityTabType {
  navigateWithPg: () => void;
  navigateOtherPg: () => void;
  categoryType: string;
}

interface Props extends CommunityTabType {
  withPostList: withPostListType[];
  loadMore: () => void;
  otherPostList: otherPostListType[];
  navigation: any;
}

function CommunityTemplate({
  navigateWithPg,
  navigateOtherPg,
  categoryType,
  withPostList,
  loadMore,
  otherPostList,
  navigation,
}: Props) {
  return (
    <View style={styles.container}>
      <CommunityTab
        navigateWithPg={navigateWithPg}
        navigateOtherPg={navigateOtherPg}
        categoryType={categoryType}
      />
      {categoryType === 'WITH' ? (
        <>
          <CommWithPost withPostList={withPostList} loadMore={loadMore} />
        </>
      ) : (
        <>
          <CommOtherPost otherPostList={otherPostList} loadMore={loadMore} />
        </>
      )}

      <EditBtn onPress={() => navigation.navigate('RegistArticle')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default CommunityTemplate;
