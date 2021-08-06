import { useAppDispatch } from 'app/hooks';
import { cityActions } from 'features/city/citySlice';
import React, { useEffect } from 'react';
import { useRouteMatch, Switch, Route } from 'react-router-dom';
import AddEditPage from './pages/AddEditPage';
import ListPage from './pages/ListPage';

export default function StudentFeature() {
  const match = useRouteMatch();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(cityActions.fetchCityList());
  }, [dispatch]);
  return (
    <Switch>
      <Route path={match.path} exact component={ListPage} />
      <Route path={`${match.path}/add`} component={AddEditPage} />
      <Route path={`${match.path}/:studentId`} component={AddEditPage} />
    </Switch>
  );
}
