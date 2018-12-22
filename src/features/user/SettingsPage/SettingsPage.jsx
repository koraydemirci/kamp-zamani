import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import ProfileSettingsPage from './ProfileSettingsPage';
import AccountSettingsPage from './AccountSettingsPage/AccountSettingsPage';
import SettingsNav from './SettingsNav';
import { closeSidebar } from '../../nav/sidebarActions';

const actions = { closeSidebar };

class SettingsPage extends Component {
  componentDidMount() {
    this.props.closeSidebar();
  }

  render() {
    return (
      <Grid stackable reversed="mobile">
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
  }
}

export default connect(
  null,
  actions
)(SettingsPage);
