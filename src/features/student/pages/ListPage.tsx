import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useEffect } from 'react';
import { studentActions, studentSelectors } from '../studentSlice';
import { Box, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import StudentTable from '../components/StudentTable';
import Pagination from '@material-ui/lab/Pagination';
import { citySelectors } from 'features/city/citySlice';
import StudentFilters from '../components/StudentFilters';
import { ListParams, Student } from 'models';
import { studentApi } from 'api/studentApi';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';

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
  const match = useRouteMatch();
  const history = useHistory();
  const studentList = useAppSelector(studentSelectors.selectStudentList);
  const pagination = useAppSelector(studentSelectors.selectPagination);
  const filter = useAppSelector(studentSelectors.selectFilter);
  const loading = useAppSelector(studentSelectors.selectLoading);
  const cityMap = useAppSelector(citySelectors.selectCityMap);
  const cityList = useAppSelector(citySelectors.selectCityList);
  const dispatch = useAppDispatch();
  const handleSearchChange = (newFilter: ListParams) => {
    dispatch(studentActions.setFilterWithDebounce(newFilter));
  };
  const handleFilterChange = (newFilter: ListParams) => {
    dispatch(studentActions.setFilter(newFilter));
  };

  const handlePageChange = (e: any, page: number) => {
    dispatch(
      studentActions.setFilter({
        ...filter,
        _page: page,
      })
    );
  };

  const handleRemoveStudent = async (student: Student) => {
    try {
      await studentApi.remove(student.id!);
      toast.success('Remove student successfully');
      const newFilter = { ...filter };
      dispatch(studentActions.setFilter(newFilter));
    } catch (error) {
      console.log('Failed to remove student', error);
    }
  };
  const handleEditStudent = async (student: Student) => {
    history.push(`${match.url}/${student.id}`);
  };
  useEffect(() => {
    dispatch(studentActions.fetchStudentList(filter));
  }, [dispatch, filter]);
  return (
    <Box className={classes.root}>
      {loading && <LinearProgress className={classes.loading} />}
      <Box className={classes.titleContainer}>
        <Typography variant="h4">Students</Typography>
        <Link to={`${match.url}/add`} style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary">
            Add new student
          </Button>
        </Link>
      </Box>
      {/* Student filters */}
      <Box mb={3}>
        <StudentFilters
          filter={filter}
          cityList={cityList}
          onChange={handleFilterChange}
          onSearchChange={handleSearchChange}
        />
      </Box>
      {/* Student table */}
      <StudentTable
        studentList={studentList}
        cityMap={cityMap}
        onEdit={handleEditStudent}
        onRemove={handleRemoveStudent}
      />
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
