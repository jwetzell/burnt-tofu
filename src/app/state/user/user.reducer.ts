import { Action, createReducer, on } from '@ngrx/store';
import { initialUserState, UserState } from '.';
import * as UserActions from './user.actions';

const _userReducer = createReducer(
  initialUserState,
  on(UserActions.setUserData, (state, {user}) => ({...state, userData: user.data})),
  on(UserActions.unsetUserData, (state) => ({...state, userData: undefined}))
)

export function userReducer(state: UserState | undefined, action: Action) {
  return _userReducer(state, action);
}
