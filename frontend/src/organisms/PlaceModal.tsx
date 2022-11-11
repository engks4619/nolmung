import React, {Dispatch, SetStateAction} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import Postcode from '@actbase/react-daum-postcode';

const getAddressData = (data: any) => {
  let defaultAddress = ''; // 기본주소
  if (data.buildingName === 'N') {
    defaultAddress = data.apartment;
  } else {
    defaultAddress = data.buildingName;
  }

  // navigation.goBack();
  // route.params.onSelect({
  //   zone_code: data.zonecode,
  //   default_address: data.address + ' ' + defaultAddress,
  // });
};
interface Props {
  setPlaceModal: Dispatch<SetStateAction<boolean>>;
}

const PlaceModal = ({setPlaceModal}: Props) => {
  return (
    <View style={styles.modalOverlay}>
      <View style={styles.bottomSheetContainer}>
        <Postcode
          style={{flex: 1, width: '100%', zIndex: 999}}
          jsOptions={{animation: true}}
          onSelected={data => {
            Alert.alert(JSON.stringify(data));
            setPlaceModal(false);
          }}
          onError={function (error: unknown): void {
            throw new Error('Function not implemented.');
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  bottomSheetContainer: {
    height: '60%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    padding: 20,
  },
});

export default PlaceModal;
