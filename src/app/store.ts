import { studentReducer } from './../features/student/studentSlice';
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import rootSaga from 'app/rootSaga';
import authReducer from 'features/auth/authSlice';
import dashboardReducer from 'features/dashboard/dashboardSlice';
import createSagaMiddleware from 'redux-saga';
import cityReducer from 'features/city/citySlice';
const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    auth: authReducer,
    city: cityReducer,
    dashboard: dashboardReducer,
    student: studentReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
    }).concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
