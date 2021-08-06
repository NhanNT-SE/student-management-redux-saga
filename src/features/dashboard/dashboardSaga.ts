import { dashboardActions, RankingByCity } from './dashboardSlice';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { City, ListResponse, Student } from 'models';
import { studentApi } from 'api/studentApi';
import { cityApi } from 'api/citiApi';

function* fetchStatistics() {
  const responseList: Array<ListResponse<Student>> = yield all([
    call(studentApi.getAll, { _page: 1, _limit: 1, _gender: 'male' }),
    call(studentApi.getAll, { _page: 1, _limit: 1, _gender: 'female' }),
    call(studentApi.getAll, { _page: 1, _limit: 1, mark_gte: 8 }),
    call(studentApi.getAll, { _page: 1, _limit: 1, mark_lte: 5 }),
  ]);
  const statisticList = responseList.map((e) => e.pagination._totalRows);
  const [maleCount, femaleCount, highMarkCount, lowMarkCount] = statisticList;
  yield put(
    dashboardActions.setStatistics({ maleCount, femaleCount, highMarkCount, lowMarkCount })
  );
}
function* fetchHighestStudentList() {
  const { data }: ListResponse<Student> = yield call(studentApi.getAll, {
    _page: 1,
    _limit: 5,
    _sort: 'mark',
    _order: 'desc',
  });
  yield put(dashboardActions.setHightestStudentList(data));
}
function* fetchLowestStudentList() {
  const { data }: ListResponse<Student> = yield call(studentApi.getAll, {
    _page: 1,
    _limit: 5,
    _sort: 'mark',
    _order: 'asc',
  });
  yield put(dashboardActions.setLowestStudentList(data));
}
function* fetchRankingByCities() {
  const { data: cityList }: ListResponse<City> = yield call(cityApi.getAll);
  const callList = cityList.map((e) =>
    call(studentApi.getAll, { _page: 1, _limit: 5, _sort: 'mark', _order: 'asc', city: e.code })
  );
  const responseList: Array<ListResponse<Student>> = yield all(callList);
  const rankingByCities: Array<RankingByCity> = responseList.map((e, index) => {
    return {
      cityId: cityList[index].code,
      cityName: cityList[index].name,
      rankingList: e.data,
    };
  });
  yield put(dashboardActions.setRankingByCities(rankingByCities));
}

function* fetchDashboardData() {
  try {
    yield all([
      call(fetchStatistics),
      call(fetchHighestStudentList),
      call(fetchLowestStudentList),
      call(fetchRankingByCities),
    ]);
    yield put(dashboardActions.fetchDataSuccess());
  } catch (error) {
    console.log('Filed to fetch dashboard data', error);
    yield put(dashboardActions.fetchDataFail());
  }
}

export default function* dashboardSaga() {
  yield takeLatest(dashboardActions.fetchData.type, fetchDashboardData);
}
