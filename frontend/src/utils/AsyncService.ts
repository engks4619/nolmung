import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

export const storeData = async (key: string, value: any) => {
  try {
    const svalue = JSON.stringify(value);
    await AsyncStorage.setItem(key, svalue);
  } catch (e) {
    Alert.alert('storeDataError', `${e}`);
  }
};

export const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      const data = JSON.parse(value);
      return data;
    }
  } catch (e: any) {
    Alert.alert('getDataError', `${e}`);
  }
};

export const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e: any) {
    Alert.alert('removeDataError', `${e}`);
  }
};
export const removeMultiple = async (keys: string[]) => {
  try {
    keys.forEach(elem => {
      AsyncStorage.removeItem(elem);
    });
  } catch (e: any) {
    Alert.alert('removeMultipleError', `${e}`);
  }
};

export const containsKey = async (key: string) => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    return keys.includes(key);
  } catch (e: any) {
    Alert.alert('containKeyError', `${e}`);
  }
};
export const getAllKeys = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    return keys;
  } catch (e: any) {
    Alert.alert('getAllkeys', `${e}`);
    return [];
  }
};

// return list of values that parsed 아 이거 맞냐 진짜...
export const getMultiple = async (keys: string[]) => {
  try {
    const pairs = await AsyncStorage.multiGet(keys);
    if (pairs.length >= 1) {
      const returns = pairs.map((pair: any) => {
        if (pair[1] !== null) {
          return JSON.parse(pair[1]);
        }
      });
      return returns;
    }
  } catch (e: any) {
    Alert.alert('getMultipleError', `${e}`);
  }
};
