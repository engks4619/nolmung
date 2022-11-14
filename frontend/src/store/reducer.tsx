import {combineReducers} from 'redux';

import userSlice from '../slices/userSlice';
import myPositionSlice from '~/slices/myPositionSlice';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  myPosition: myPositionSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
