import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { ListParams, ListResponse, PaginationParams, Student } from 'models';

export interface StudentState {
  loading: boolean;
  list: Student[];
  filter: ListParams;
  pagination: PaginationParams;
}
const initialState: StudentState = {
  loading: false,
  list: [],
  filter: {
    _page: 1,
    _limit: 5,
  },
  pagination: {
    _page: 1,
    _limit: 5,
    _totalRows: 5,
  },
};
const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    fetchStudentList(state, action: PayloadAction<ListParams>) {
      state.loading = true;
    },
    fetchStudentListSuccess(state, action: PayloadAction<ListResponse<Student>>) {
      state.loading = false;
      state.list = action.payload.data;
      state.pagination = action.payload.pagination;
    },
    fetchStudentListFailed(state) {
      state.loading = false;
    },

    setFilter(state, action: PayloadAction<ListParams>) {
      state.filter = action.payload;
    },
    setFilterWithDebounce(state, action: PayloadAction<ListParams>) {
    },
  },
});

export const studentActions = studentSlice.actions;
export const studentSelectors = {
  selectLoading: (state: RootState) => state.student.loading,
  selectStudentList: (state: RootState) => state.student.list,
  selectFilter: (state: RootState) => state.student.filter,
  selectPagination: (state: RootState) => state.student.pagination,
};
export const studentReducer = studentSlice.reducer;
export default studentReducer;
