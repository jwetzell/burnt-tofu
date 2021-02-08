import { createAction, props } from '@ngrx/store';
import { Summary, User } from 'wanikani-api-ng';

export const setUserData = createAction('[User] Set User Data', props<{user: User}>());
export const setSummaryData = createAction('[User] Set Summary Data', props<{summary: Summary}>());
export const unsetUserState = createAction('[User] Unset User state');
