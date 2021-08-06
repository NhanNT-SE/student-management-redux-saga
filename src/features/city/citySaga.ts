import { cityActions } from './citySlice';
import { call, takeLatest, put } from 'redux-saga/effects';
import { City, ListResponse } from 'models';
import { cityApi } from 'api/cityApi';

function* fetchCityList() {
  try {
    const response: ListResponse<City> = yield call(cityApi.getAll);
    yield put(cityActions.fetchCityListSuccess(response));
  } catch (error) {
    console.log('Failed to fetch city list', error);
    yield put(cityActions.fetchCityListFailed());
  }
}

export default function* citySaga() {
  yield takeLatest(cityActions.fetchCityList.type, fetchCityList);
}
