import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {FONT_SIZE_S} from '~/const';
import NaverMapView, {Marker} from 'react-native-nmap';

interface Props {
  lat: number;
  lng: number;
  address: string;
  textAddress: string;
  name: string;
}

const MARKER_IMG = require('@assets/marker.png');

function SpotAddressSummary({lat, lng, address, textAddress, name}: Props) {
  return (
    <View style={styles.container}>
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>
        {address}
      </Text>
      <View style={styles.hContainer}>
        <View style={styles.border}>
          <Text style={styles.text}>지번</Text>
        </View>
        <Text style={styles.text}>{textAddress}</Text>
      </View>
      <View style={styles.mapContainer}>
        <NaverMapView
          style={styles.map}
          zoomControl={true}
          center={{
            zoom: 15,
            latitude: lat,
            longitude: lng,
          }}>
          <Marker
            coordinate={{latitude: lat, longitude: lng}}
            width={25}
            height={25}
            caption={{text: name}}
            image={MARKER_IMG}
          />
        </NaverMapView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
  },
  hContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
  },
  border: {
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    flexDirection: 'row',
    marginRight: 5,
  },
  text: {
    color: 'black',
    fontSize: FONT_SIZE_S,
  },
  mapContainer: {
    marginTop: 10,
    flex: 1,
    alignItems: 'center',
    height: 150,
  },
  map: {
    justifySelf: 'center',
    width: '100%',
    height: 150,
  },
});
export default SpotAddressSummary;
