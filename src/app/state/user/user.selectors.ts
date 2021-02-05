import { AppState } from '..';

export const userData = (state: AppState) => state.user.userData;
export const userPreferences = (state: AppState)=> state.user.preferences;
export const summaryData = (state: AppState) => state.user.summaryData;
