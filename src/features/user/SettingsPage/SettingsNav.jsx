import React from 'react';
import { Menu, Header } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const SettingsNav = () => {
  return (
    <Menu vertical>
      <Header
        icon="settings"
        attached
        inverted
        color="grey"
        content="Hesabım"
      />
      <Menu.Item as={NavLink} to="/settings/profile">
        Profil Ayarları
      </Menu.Item>
      <Menu.Item as={NavLink} to="/settings/account">
        Hesap Ayarları
      </Menu.Item>
    </Menu>
  );
};

export default SettingsNav;
