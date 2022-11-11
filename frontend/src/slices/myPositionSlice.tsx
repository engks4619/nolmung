import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isSaving: false,
  isLogging: false,
  myPosition: null,
  startDate: null,
  lastUpdate: null,
  path: [],
  dogs: [
    {dogName: '멍멍이1', breedCodeValue: '견종', image: 'imagePath'},
    {dogName: '멍멍이2', breedCodeValue: '견종', image: 'imagePath'},
  ],
};

//이전 로그 전송 함수
// const saveLogs = async () => {
//   try {
//     const response: AxiosResponse = await axios.post('로그저장주소');
//     const data: DetailProps = response.data;
//     setDetailContent(data);
//   } catch (error: any) {
//     Alert.alert(
//       `에러코드 ${error.response.status}`,
//       '죄송합니다. 다시 시도해주시길 바랍니다.',
//     );
//   }
// };

//.toLocaleString('ko-KR')
const myPositionSlice = createSlice({
  name: 'myPosition',
  initialState,
  reducers: {
    setIsLoggingOn(state) {
      state.isLogging = true;
    },
    setIsSavingOn(state) {
      state.isSaving = true;
    },
    setIsSavingOff(state) {
      state.isSaving = false;
    },
    setMyPosition(state, action) {
      state.myPosition = action.payload;
    },
    addPath(state, action) {
      state.path = state.path.concat(action.payload);
    },
    setStates(state, action) {
      state.startDate = action.payload.startDate;
      state.lastUpdate = action.payload.lastUpdate;
      state.path = action.payload.walkingLogs;
      state.dogs = action.payload.dogs;
    },
    resetStates(state) {
      Object.assign(state, initialState);
    },
  },
  extraReducers: builder => {},
});

export const {
  setMyPosition,
  setIsLoggingOn,
  addPath,
  setStates,
  resetStates,
  setIsSavingOn,
  setIsSavingOff,
} = myPositionSlice.actions;
export default myPositionSlice;
