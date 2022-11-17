import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {FONT_SIZE_M, FONT_SIZE_S} from '~/const';
import {spot} from '~/utils/type';
import {getTextAddress} from 'utils/addressService';
import NaverMapView, {Marker} from 'react-native-nmap';
import {Coord} from 'react-native-nmap';

interface Props {
  spot: spot | null;
}

const MARKER_IMG = require('@assets/marker.png');

function SpotAddressSummary({spot}: Props) {
  const [textAddress, setTextAddress] = useState<string>('');

  const getAddress = async () => {
    if (spot?.lat && spot?.lng) {
      const response = await getTextAddress(spot?.lat, spot?.lng);
      if (response.status === 200) {
        const address = response.data.documents[0].address;
        const text =
          address.region_2depth_name +
          ' ' +
          address.region_3depth_name +
          ' ' +
          address.main_address_no +
          (address.sub_address_no ? '-' + address.sub_address_no : '');
        setTextAddress(text);
      }
    }
  };

  useEffect(() => {
    getAddress();
  }, [spot]);

  return (
    <View style={styles.container}>
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>
        {spot?.address}
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
            latitude: spot?.lat ?? 0,
            longitude: spot?.lng ?? 0,
          }}>
          <Marker
            coordinate={{latitude: spot?.lat ?? 0, longitude: spot?.lng ?? 0}}
            width={25}
            height={25}
            caption={{text: spot?.name}}
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
    minHeight: 150,
  },
  map: {
    justifySelf: 'center',
    width: '100%',
    height: '100%',
  },
});
export default SpotAddressSummary;
