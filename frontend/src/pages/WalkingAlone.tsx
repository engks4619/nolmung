// import Geolocation from '@react-native-community/geolocation';
// import {useEffect} from 'react';
// import {containsKey, getData} from '~/utils/AsyncService';

// const checkAsyncStorage = async (): Promise<boolean> => {
//   const hasLog = await containsKey('walkingLog');
//   if (hasLog) {
//     const walkingLog = await getData('walkingLog');
//     if (walkingLog.length >= 2) {
//       return walkingLog;
//     } else {
//       return false;
//     }
//   } else {
//     return false;
//   }
// };

// useEffect(() => {
//   if (checkAsyncStorage) {
//     setpolylinePath(checkAsyncStorage);
//     //async조회결과 true 이면 polyLine은 이전 기록들로 대체
//   } else {
//     //polyline은 현재데이터 * 2 넣기
//     Geolocation.getCurrentPosition(
//       info => {
//         const initialLocation: Geoloc = {
//           latitude: info.coords.latitude,
//           longitude: info.coords.longitude,
//         };
//         const currentList: GeolocList = [initialLocation, initialLocation];
//         setpolylinePath(currentList);
//       },
//       console.error,
//       {enableHighAccuracy: true},
//     );
//   }
// }, []);
