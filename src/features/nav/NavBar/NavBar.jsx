import React, { Component } from 'react';
import { Button, Menu, Container, Icon, Responsive } from 'semantic-ui-react';
import { withFirebase } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';

import { openModal } from '../../modals/modalActions';
import { openSidebar } from '../sidebarActions';
import SignedOutMenu from '../Menus/SignedOutMenu';
import SignedInMenu from '../Menus/SignedInMenu';

const actions = {
  openModal,
  openSidebar
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
    const { auth, profile, openSidebar } = this.props;
    const authenticated = auth.isLoaded && !auth.isEmpty;

    return (
      <Menu inverted fixed="top">
        <Responsive as={Container} minWidth={992}>
          <Menu.Item as={NavLink} to="/about">
            <img src="/assets/logo.png" alt="logo" />
            KAMP ZAMANI
          </Menu.Item>
          <Menu.Item as={NavLink} to="/places" content="Kamp Yerleri" />
          <Menu.Item as={NavLink} exact to="/events" content="Kamp Tarihleri" />
          {authenticated && (
            <Menu.Item as={NavLink} to="/people" content="Arkadaşlarım" />
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
        </Responsive>
        <Responsive as={Container} maxWidth={992} style={{ border: 0 }}>
          <Menu.Item
            onClick={openSidebar}
            as={Button}
            style={{
              marginTop: 5,
              color: 'white'
            }}
          >
            <Icon
              name="bars"
              style={{
                marginBottom: 5
              }}
            />{' '}
            Menü
          </Menu.Item>
          {authenticated ? (
            <Menu.Item position="right">
              <Button
                onClick={this.handleSignOut}
                basic
                inverted
                content="Çıkış"
              />
            </Menu.Item>
          ) : (
            <SignedOutMenu
              register={this.handleRegister}
              signIn={this.handleSignIn}
            />
          )}
        </Responsive>
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
