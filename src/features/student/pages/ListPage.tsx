import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useEffect } from 'react';
import { studentActions, studentSelectors } from '../studentSlice';
import { Box, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import StudentTable from '../components/StudentTable';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    paddingTop: theme.spacing(1),
  },
  loading: {
    position: 'absolute',
    width: '100%',
    top: theme.spacing(-1),
  },
  titleContainer: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(4),
  },
}));

export default function ListPage() {
  const classes = useStyles();
  const studentList = useAppSelector(studentSelectors.selectStudentList);
  const pagination = useAppSelector(studentSelectors.selectPagination);
  const filter = useAppSelector(studentSelectors.selectFilter);
  const loading = useAppSelector(studentSelectors.selectLoading);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(studentActions.fetchStudentList(filter));
  }, [dispatch, filter]);
  const handlePageChange = (e: any, page: number) => {
    dispatch(
      studentActions.setFilter({
        ...filter,
        _page: page,
      })
    );
  };
  return (
    <Box className={classes.root}>
      {loading && <LinearProgress className={classes.loading} />}
      <Box className={classes.titleContainer}>
        <Typography variant="h4">Students</Typography>
        <Button variant="contained" color="primary">
          Add new student
        </Button>
      </Box>
      {/* Student table */}
      <StudentTable studentList={studentList} />
      {/* Pagination */}
      <Box mt={2} display="flex" justifyContent="center">
        <Pagination
          color="primary"
          count={Math.ceil(pagination._totalRows / pagination._limit)}
          page={pagination._page}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
}
