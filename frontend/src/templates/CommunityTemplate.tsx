import React, {Dispatch, SetStateAction} from 'react';
import {View, StyleSheet, Modal} from 'react-native';
import CommunityTab from '@organisms/CommunityTab';
import CommWithPost from '@organisms/CommWithPost';
import CommOtherPost from '@organisms/CommOtherPost';
import {withPostListType, otherPostListType} from '@pages/Community';
import EditBtn from '@molecules/EditBtn';
import CommunityFilterModal from '~/organisms/CommunityFilterModal';

export interface CommunityTabType {
  navigateWithPg: () => void;
  navigateOtherPg: () => void;
  categoryType: string;
  searching: boolean;
  setSearching: Dispatch<SetStateAction<boolean>>;
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

interface Props extends CommunityTabType {
  withPostList: withPostListType[];
  loadMore: () => void;
  otherPostList: otherPostListType[];
  navigation: any;
  refreshing: boolean;
  setRefreshing: Dispatch<SetStateAction<boolean>>;
  getWithPostList: (pgNum: number, isRefresh?: boolean) => void;
  getOtherPostList: (pgNum: number, isRefresh?: boolean) => void;
}

function CommunityTemplate({
  navigateWithPg,
  navigateOtherPg,
  categoryType,
  withPostList,
  loadMore,
  otherPostList,
  navigation,
  refreshing,
  setRefreshing,
  getWithPostList,
  getOtherPostList,
  searching,
  setSearching,
  modalOpen,
  setModalOpen,
}: Props) {
  return (
    <View style={styles.container}>
      <Modal
        visible={modalOpen}
        animationType={'fade'}
        transparent={true}
        onRequestClose={() => setModalOpen(false)}>
        <CommunityFilterModal setModalOpen={setModalOpen} />
      </Modal>
      <CommunityTab
        navigateWithPg={navigateWithPg}
        navigateOtherPg={navigateOtherPg}
        categoryType={categoryType}
        searching={searching}
        setSearching={setSearching}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
      {categoryType === 'WITH' ? (
        <CommWithPost
          withPostList={withPostList}
          loadMore={loadMore}
          refreshing={refreshing}
          setRefreshing={setRefreshing}
          refresh={getWithPostList}
        />
      ) : (
        <CommOtherPost
          otherPostList={otherPostList}
          loadMore={loadMore}
          refreshing={refreshing}
          setRefreshing={setRefreshing}
          refresh={getOtherPostList}
        />
      )}

      <EditBtn onPress={() => navigation.navigate('RegistArticle')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CommunityTemplate;
