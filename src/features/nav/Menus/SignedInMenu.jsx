import React from 'react';
import { Menu, Image, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const SignedInMenu = ({ profile, auth, signOut }) => (
  <Menu.Item position="right">
    <Image avatar spaced="right" src={profile.photoURL || '/assets/user.png'} />
    <Dropdown pointing="top left" text={profile.displayName}>
      <Dropdown.Menu>
        <Dropdown.Item
          as={Link}
          to="/createEvent"
          text="Etkinlik Ekle"
          icon="fire"
        />
        <Dropdown.Item
          as={Link}
          to="/createPlace"
          text="Kamp Yeri Ekle"
          icon="map marker alternate"
        />
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
        <Dropdown.Item onClick={signOut} text="Çıkış" icon="power" />
      </Dropdown.Menu>
    </Dropdown>
  </Menu.Item>
);

export default SignedInMenu;
