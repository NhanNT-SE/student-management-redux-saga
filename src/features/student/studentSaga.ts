import { studentActions } from './studentSlice';
import { call, takeLatest, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { ListParams, ListResponse, Student } from 'models';
import { studentApi } from 'api/studentApi';

function* fetchStudentList(action: PayloadAction<ListParams>) {
  try {
    const response: ListResponse<Student> = yield call(studentApi.getAll, action.payload);
    yield put(studentActions.fetchStudentListSuccess(response));
  } catch (error) {
    console.log('Failed to fetch student list', error);
    yield put(studentActions.fetchStudentListFailed());
  }
}

export default function* studentSaga() {
  yield takeLatest(studentActions.fetchStudentList.type, fetchStudentList);
}
