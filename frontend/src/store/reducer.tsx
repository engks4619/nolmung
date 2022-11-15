import {combineReducers} from 'redux';

import userSlice from '~/slices/userSlice';
import myPositionSlice from '~/slices/myPositionSlice';
import dogsSlice from '~/slices/dogsSlice';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  myPosition: myPositionSlice.reducer,
  dogs: dogsSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
