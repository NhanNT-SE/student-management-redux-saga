import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useEffect } from 'react';
import { dashboardActions, dashboardSelectors } from './dashboardSlice';
import { Box, Grid, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import StatisticsItem from './components/StatisticsItem';
import { PeopleAlt } from '@material-ui/icons';
import Widget from './components/Widget';
import StudentRankingList from './components/StudentRankingList';
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
  useEffect(() => {
    dispatch(dashboardActions.fetchData());
  }, [dispatch]);
  return (
    <Box className={classes.root}>
      {/* Loading */}

      {loading && <LinearProgress className={classes.loading} />}
      {/* Statistics section */}

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

      {/* All student ranking */}

      <Box mt={5}>
        <Typography variant="h4">All Students</Typography>
        <Box mt={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <Widget title="Student with hightest mark">
                <StudentRankingList studentList={highestStudentList} />
              </Widget>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Widget title="Student with lowest mark">
                <StudentRankingList studentList={lowestStudentList} />
              </Widget>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {/* Ranking by city */}
      <Box mt={5}>
        <Typography variant="h4">Ranking Students</Typography>
        <Box mt={2}>
          <Grid container spacing={3}>
            {rankingByCities.map((ranking) => (
              <Grid item xs={12} md={6} lg={3} key={ranking.cityId}>
                <Widget title={ranking.cityName}>
                  <StudentRankingList studentList={ranking.rankingList} />
                </Widget>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
