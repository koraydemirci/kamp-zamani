import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ProfileSettingsPage from './ProfileSettingsPage';
import AccountSettingsPage from './AccountSettingsPage/AccountSettingsPage';
import SettingsNav from './SettingsNav';

const SettingsPage = () => {
  return (
    <Grid>
      <Grid.Column width={12}>
        <Switch>
          <Redirect exact from="/settings" to="/settings/profile" />
          <Route
            path="/settings/profile"
            render={() => <ProfileSettingsPage />}
          />
          <Route
            path="/settings/account"
            render={() => <AccountSettingsPage />}
          />
        </Switch>
      </Grid.Column>
      <Grid.Column width={4}>
        <SettingsNav />
      </Grid.Column>
    </Grid>
  );
};

export default SettingsPage;
