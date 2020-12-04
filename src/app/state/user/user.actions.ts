import { createAction, props } from '@ngrx/store';
import { User } from 'wanikani-api-ng';

export const setUserData = createAction('[User] Set User Date', props<{user: User}>());
export const unsetUserData = createAction('[User] Unset User Data');
