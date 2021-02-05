import { Preferences, SummaryData, UserData } from 'wanikani-api-ng';

export interface UserState {
  userData: UserData;
  preferences: Preferences;
  summaryData: SummaryData;
}

export const initialUserState: UserState = {
  userData: undefined,
  preferences: undefined,
  summaryData: undefined
}
