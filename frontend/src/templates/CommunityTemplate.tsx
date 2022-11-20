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
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
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
  startDateModal: boolean;
  setStartDateModal: Dispatch<SetStateAction<boolean>>;
  endDateModal: boolean;
  setEndDateModal: Dispatch<SetStateAction<boolean>>;
  startDate: Date;
  setStartDate: Dispatch<SetStateAction<Date>>;
  endDate: Date;
  setEndDate: Dispatch<SetStateAction<Date>>;
  requestBody: any;
  setRequestBody: Dispatch<SetStateAction<any>>;
  startPay: number;
  setStartPay: Dispatch<SetStateAction<number>>;
  endPay: number;
  setEndPay: Dispatch<SetStateAction<number>>;
  selectedSido: string;
  setSelectedSido: Dispatch<SetStateAction<string>>;
  selectedSigugun: string;
  setSelectedSigugun: Dispatch<SetStateAction<string>>;
  selectedDong: string;
  setSelectedDong: Dispatch<SetStateAction<string>>;
  selectedBreed: number;
  setSelectedBreed: Dispatch<SetStateAction<number>>;
  searchWithPost: () => void;
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
  startDateModal,
  setStartDateModal,
  endDateModal,
  setEndDateModal,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  requestBody,
  setRequestBody,
  startPay,
  setStartPay,
  endPay,
  setEndPay,
  searchValue,
  setSearchValue,
  selectedSido,
  setSelectedSido,
  selectedSigugun,
  setSelectedSigugun,
  selectedDong,
  setSelectedDong,
  selectedBreed,
  setSelectedBreed,
  searchWithPost,
}: Props) {
  return (
    <View style={styles.container}>
      <Modal
        visible={modalOpen}
        animationType={'fade'}
        transparent={true}
        onRequestClose={() => setModalOpen(false)}>
        <CommunityFilterModal
          setModalOpen={setModalOpen}
          startDateModal={startDateModal}
          setStartDateModal={setStartDateModal}
          endDateModal={endDateModal}
          setEndDateModal={setEndDateModal}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          requestBody={requestBody}
          setRequestBody={setRequestBody}
          startPay={startPay}
          setStartPay={setStartPay}
          endPay={endPay}
          setEndPay={setEndPay}
          selectedSido={selectedSido}
          setSelectedSido={setSelectedSido}
          selectedSigugun={selectedSigugun}
          setSelectedSigugun={setSelectedSigugun}
          selectedDong={selectedDong}
          setSelectedDong={setSelectedDong}
          selectedBreed={selectedBreed}
          setSelectedBreed={setSelectedBreed}
          searchWithPost={searchWithPost}
        />
      </Modal>
      <CommunityTab
        navigateWithPg={navigateWithPg}
        navigateOtherPg={navigateOtherPg}
        categoryType={categoryType}
        searching={searching}
        setSearching={setSearching}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
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
