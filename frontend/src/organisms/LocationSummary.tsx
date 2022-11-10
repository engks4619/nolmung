import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SearchBar from '../atoms/SearchBar';

interface Props {
  userLocation: string;
  onSearchSubmit: (val: string) => void;
  searchValue: string;
  onChangeSearchValue: (val: string) => void;
}

function LocationSummary({
  userLocation,
  onSearchSubmit,
  searchValue,
  onChangeSearchValue,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.locationTitle}>현재 표시되고 있는 위치는</Text>
      <View style={[styles.hContainer, styles.borderBottom]}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.locationDesc}>
          {userLocation}
        </Text>
        <View style={styles.searchBar}>
          <SearchBar
            onSearchSubmit={onSearchSubmit}
            searchValue={searchValue}
            onChangeSearchValue={onChangeSearchValue}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'blue',s
    paddingHorizontal: 10,
  },
  hContainer: {
    width: '100%',
    // backgroundColor: 'cyan',
    alignItems: 'center',
    flexDirection: 'row',
    // paddingVertical: 5,
    paddingHorizontal: 0,
    marginHorizontal: 0,
  },
  borderBottom: {
    borderBottomWidth: 1,
    // marginHorizontal: 10,
  },
  locationTitle: {
    // backgroundColor: 'red',
    // paddingHorizontal: 10,
    paddingTop: 5,
    fontSize: 10,
    fontWeight: '700',
  },
  locationDesc: {
    // backgroundColor: 'yellow',
    paddingLeft: 5,
    width: '35%',
    fontSize: 15,
    fontWeight: '900',
  },
  searchBar: {
    width: '70%',
  },
});

export default LocationSummary;
