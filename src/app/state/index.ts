import { userReducer, UserState } from './user';

export * from './user';

export interface AppState {
  user: UserState
}

export const reducerMap = {
  user: userReducer
};
