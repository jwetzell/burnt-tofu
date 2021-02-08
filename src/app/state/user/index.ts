import { SummaryData, UserData } from 'wanikani-api-ng';

export interface UserState {
  userData: UserData;
  summaryData: SummaryData;
}

export const initialUserState: UserState = {
  userData: undefined,
  summaryData: undefined
}
