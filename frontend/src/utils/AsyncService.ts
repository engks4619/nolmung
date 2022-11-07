import AsyncStorage from '@react-native-async-storage/async-storage';

// export const storeData = async (key: string, value: any) => {
//   try {
//     const stringValue = JSON.stringify(value);
//     console.log('12312312', stringValue);
//     await AsyncStorage.setItem(key, stringValue);
//   } catch (e: any) {
//     console.error(e.message);
//   }
// };
export const storeData = async (key: string, value: any) => {
  // console.log(value);
  try {
    const svalue = JSON.stringify(value);
    console.log(svalue);
    await AsyncStorage.setItem(key, svalue);
  } catch (e) {
    console.log(e);
  }
};

export const getData = async (key: string) => {
  // console.log('key', key);
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      const data = JSON.parse(value);
      return data;
    }
  } catch (e: any) {
    console.log(e.message);
  }
};

export const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e: any) {
    console.error(e.message);
  }
};

export const containsKey = async (key: string) => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    return keys.includes(key);
  } catch (e: any) {
    console.error(e.message);
  }
};
