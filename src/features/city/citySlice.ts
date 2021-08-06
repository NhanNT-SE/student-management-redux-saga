import { City, ListResponse } from 'models';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
export interface CityState {
  loading: boolean;
  list: City[];
}

const initialState: CityState = {
  loading: false,
  list: [],
};
const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    fetchCityList(state) {
      state.loading = true;
    },
    fetchCityListSuccess(state, action: PayloadAction<ListResponse<City>>) {
      state.loading = false;
      state.list = action.payload.data;
    },
    fetchCityListFailed(state) {
      state.loading = false;
    },
  },
});

export const cityActions = citySlice.actions;
export const citySelectors = {
  selectCityList: (state: RootState) => state.city.list,
  selectCityMap: createSelector(
    (state: RootState) => state.city.list,
    (cityList) => {
      return cityList.reduce((map: { [key: string]: City }, city) => {
        map[city.code] = city;
        return map;
      }, {});
    }
  ),
  selectCityOptions: createSelector(
    (state: RootState) => state.city.list,
    (cityList) => cityList.map((city) => ({ label: city.name, value: city.code }))
  ),
};
const cityReducer = citySlice.reducer;

export default cityReducer;
