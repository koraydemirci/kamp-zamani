import React, { Component } from 'react';
import { Menu, Image, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class SignedInMenu extends Component {
  signOut = () => {
    this.props.signOut();
    window.location.reload();
  };

  render() {
    const { profile, auth } = this.props;
    return (
      <Menu.Item position="right">
        <Image
          avatar
          spaced="right"
          src={profile.photoURL || '/assets/user.png'}
        />
        <Dropdown pointing="top left" text={profile.displayName}>
          <Dropdown.Menu>
            <Dropdown.Item text="Kamp Tarihlerim" icon="calendar" />
            <Dropdown.Item text="Kamp Arkadaşlarım" icon="users" />
            <Dropdown.Item
              as={Link}
              to={`/profile/${auth.uid}`}
              text="Profilim"
              icon="user"
            />
            <Dropdown.Item
              as={Link}
              to="/settings"
              text="Ayarlar"
              icon="settings"
            />
            <Dropdown.Item onClick={this.signOut} text="Çıkış" icon="power" />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
    );
  }
}

export default SignedInMenu;
