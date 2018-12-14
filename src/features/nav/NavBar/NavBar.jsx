import React, { Component } from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import { withFirebase } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { NavLink, Link, withRouter } from 'react-router-dom';

import { openModal } from '../../modals/modalActions';
import SignedOutMenu from '../Menus/SignedOutMenu';
import SignedInMenu from '../Menus/SignedInMenu';

const actions = {
  openModal
};

const mapState = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile
});

class NavBar extends Component {
  handleSignIn = () => {
    this.props.openModal('LoginModal');
  };

  handleRegister = () => {
    this.props.openModal('RegisterModal');
  };

  handleSignOut = () => {
    this.props.firebase.logout();
    this.props.history.push('/');
  };

  render() {
    const { auth, profile } = this.props;
    const authenticated = auth.isLoaded && !auth.isEmpty;

    return (
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item as={NavLink} to="/about" header>
            <img src="/assets/logo.png" alt="logo" />
            KAMP ZAMANI
          </Menu.Item>
          <Menu.Item
            as={NavLink}
            exact
            to="/campingEvents"
            content="Kamp Tarihleri"
          />
          {authenticated && (
            <Menu.Item as={NavLink} to="/people" content="Kamp Arkadaşlarım" />
          )}
          {authenticated && (
            <Menu.Item>
              <Button
                as={Link}
                to="/createCampingEvent"
                floated="right"
                positive
                inverted
                content="Kamp Organize Et"
              />
            </Menu.Item>
          )}
          {authenticated ? (
            <SignedInMenu
              auth={auth}
              profile={profile}
              signOut={this.handleSignOut}
            />
          ) : (
            <SignedOutMenu
              register={this.handleRegister}
              signIn={this.handleSignIn}
            />
          )}
        </Container>
      </Menu>
    );
  }
}

export default withRouter(
  withFirebase(
    connect(
      mapState,
      actions
    )(NavBar)
  )
);
