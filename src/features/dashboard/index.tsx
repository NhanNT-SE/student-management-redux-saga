import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useEffect } from 'react';
import { dashboardActions, dashboardSelectors } from './dashboardSlice';
import { Box, Grid, LinearProgress, makeStyles } from '@material-ui/core';
import StatisticsItem from './components/StatisticsItem';
import { PeopleAlt } from '@material-ui/icons';
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
}));
export default function Dashboard() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(dashboardSelectors.loading);
  const statistics = useAppSelector(dashboardSelectors.statistics);
  const highestStudentList = useAppSelector(dashboardSelectors.highestStudentList);
  const lowestStudentList = useAppSelector(dashboardSelectors.lowestStudentList);
  const rankingByCities = useAppSelector(dashboardSelectors.rankingByCities);
  console.log({
    loading,
    statistics,
    highestStudentList,
    lowestStudentList,
    rankingByCities,
  });
  useEffect(() => {
    dispatch(dashboardActions.fetchData());
  }, [dispatch]);
  return (
    <Box className={classes.root}>
      {/* Statistics section */}
      {loading && <LinearProgress className={classes.loading} />}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticsItem
            icon={<PeopleAlt fontSize="large" color="primary" />}
            label="male"
            value={statistics.maleCount}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticsItem
            icon={<PeopleAlt fontSize="large" color="primary" />}
            label="female"
            value={statistics.femaleCount}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticsItem
            icon={<PeopleAlt fontSize="large" color="primary" />}
            label="mark >=8"
            value={statistics.highMarkCount}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticsItem
            icon={<PeopleAlt fontSize="large" color="primary" />}
            label="mark <=5"
            value={statistics.lowMarkCount}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
