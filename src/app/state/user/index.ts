import { UserData } from 'wanikani-api-ng';

export * from './user.actions';
export * from './user.reducer';
export * from './user.selectors';

export interface UserState {
  userData: UserData
}

export const initialUserState: UserState = {
  userData: undefined
}
