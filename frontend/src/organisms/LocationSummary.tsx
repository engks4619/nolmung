import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SearchBar from '../atoms/SearchBar';

interface Props {
  userLocation: string;
  onSearchSubmit: (val:string) => void;
  searchValue: string;
  onChangeSearchValue: (val:string) => void;
}

function LocationSummary({
  userLocation,
  onSearchSubmit,
  searchValue,
  onChangeSearchValue,
}: Props) {
  return(
    <View style={styles.container}>
      <Text style={styles.locationTitle}>현재 표시되고 있는 위치는</Text>
      <View style={[styles.hContainer, styles.borderBottom]}>
        <Text  style={styles.locationDesc}>{userLocation}</Text>
        <SearchBar 
          onSearchSubmit={onSearchSubmit}
          searchValue={searchValue}
          onChangeSearchValue={onChangeSearchValue}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  hContainer: {
    alignItems: 'center',
    flexDirection:'row',
  },
  borderBottom: {
    borderBottomWidth: 1,
    marginHorizontal: 10,
  },
  locationTitle: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 12,
    fontWeight: '700',
  },
  locationDesc: {
    paddingHorizontal: 20,
    fontSize: 16,
    fontWeight: '900',
  },
});

export default LocationSummary;