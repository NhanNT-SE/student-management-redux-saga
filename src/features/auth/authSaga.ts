import { PayloadAction } from '@reduxjs/toolkit';
import { call, delay, fork, put, take } from 'redux-saga/effects';
import { rootHistory } from 'utils';
import { LoginPayload, authAction } from './authSlice';

function* handleLogin(payload: LoginPayload) {
  yield delay(1000);
  localStorage.setItem('access_token', 'access token');
  yield put(
    authAction.loginSuccess({
      id: 'PS-10674',
      name: 'Nhan-NT',
    })
  );
  rootHistory.push('/admin/dashboard');
}
function* handleLogout() {
  yield delay(500);
  localStorage.removeItem('access_token');
  rootHistory.push('/login');
}
function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem('access_token'));
    if (!isLoggedIn) {
      const action: PayloadAction<LoginPayload> = yield take(authAction.login.type);
      yield fork(handleLogin, action.payload);
    }
    yield take(authAction.logout.type);
    yield call(handleLogout);
  }
}
export default function* authSaga() {
  yield fork(watchLoginFlow);
}
