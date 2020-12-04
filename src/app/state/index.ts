import { UserState } from './user';
import { userReducer } from './user/user.reducer';

export interface AppState {
  user: UserState
}

export const reducerMap = {
  user: userReducer
};
