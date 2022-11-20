import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import {CommunityTabType} from '@templates/CommunityTemplate';
import {BORDER_COLOR, MAIN_COLOR} from '~/const';
import Search from '@assets/search.svg';
import Filter from '@assets/filter.svg';

function CommunityTab({
  navigateWithPg,
  navigateOtherPg,
  categoryType,
  modalOpen,
  setModalOpen,
  searchValue,
  setSearchValue,
}: CommunityTabType) {
  return (
    <View style={styles.tabContainer}>
      <View style={styles.hContainer}>
        <Text
          style={
            categoryType === 'WITH'
              ? [styles.textContainer, styles.textActive]
              : styles.textContainer
          }
          onPress={navigateWithPg}>
          함께 가요
        </Text>
        <Text
          style={
            categoryType === 'OTHER'
              ? [styles.textContainer, styles.textActive]
              : styles.textContainer
          }
          onPress={navigateOtherPg}>
          돌봐줘요
        </Text>
      </View>
      <View style={styles.filterContainer}>
        <View style={[styles.filter, styles.hContainer]}>
          <TextInput
            style={styles.searchBar}
            value={searchValue}
            onChangeText={text => setSearchValue(text)}
          />
          <Search width={20} height={20} fill="black" />
        </View>
        <View style={styles.filter}>
          <TouchableOpacity onPress={() => setModalOpen(true)}>
            <Filter width={27} height={27} fill="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 2,
    backgroundColor: 'white',
  },
  textActive: {
    color: MAIN_COLOR,
  },
  textContainer: {
    paddingHorizontal: 10,
    fontSize: 15,
    fontWeight: 'bold',
  },
  hContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  filter: {
    flex: 1,
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    height: 40,
    marginHorizontal: 15,
  },
});

export default CommunityTab;
