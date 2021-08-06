import { RootState } from './../../app/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Student } from 'models';

export interface DashboardStatistics {
  maleCount: number;
  femaleCount: number;
  highMarkCount: number;
  lowMarkCount: number;
}
export interface RankingByCity {
  cityId: string;
  cityName: string;
  rankingList: Student[];
}

export interface DashboardState {
  loading: boolean;
  statistics: DashboardStatistics;
  highestStudentList: Student[];
  lowestStudentList: Student[];
  rankingByCities: RankingByCity[];
}

const initialState: DashboardState = {
  loading: false,
  statistics: {
    femaleCount: 0,
    maleCount: 0,
    highMarkCount: 0,
    lowMarkCount: 0,
  },
  highestStudentList: [],
  lowestStudentList: [],
  rankingByCities: [],
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    fetchData(state) {
      state.loading = true;
    },
    fetchDataSuccess(state) {
      state.loading = false;
    },
    fetchDataFail(state) {
      state.loading = false;
    },

    setStatistics(state, action: PayloadAction<DashboardStatistics>) {
      state.statistics = action.payload;
    },
    setHightestStudentList(state, action: PayloadAction<Student[]>) {
      state.highestStudentList = action.payload;
    },
    setLowestStudentList(state, action: PayloadAction<Student[]>) {
      state.lowestStudentList = action.payload;
    },
    setRankingByCities(state, action: PayloadAction<RankingByCity[]>) {
      state.rankingByCities = action.payload;
    },
  },
});

export const dashboardActions = dashboardSlice.actions;

export const dashboardSelectors = {
  loading: (state: RootState) => state.dashboard.loading,
  statistics: (state: RootState) => state.dashboard.statistics,
  highestStudentList: (state: RootState) => state.dashboard.highestStudentList,
  lowestStudentList: (state: RootState) => state.dashboard.lowestStudentList,
  rankingByCities: (state: RootState) => state.dashboard.rankingByCities,
};

const dashboardReducer = dashboardSlice.reducer;

export default dashboardReducer;
