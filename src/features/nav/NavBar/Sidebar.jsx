import React, { Component } from 'react';
import { Sidebar, Menu, Icon, Image, Dimmer, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { closeSidebar } from '../sidebarActions';

const mapState = ({ sidebar, firebase }) => ({
  visible: sidebar.visible,
  dimmerActive: sidebar.dimmerActive,
  auth: firebase.auth,
  profile: firebase.profile
});

const actions = { closeSidebar };

export class SidebarNav extends Component {
  state = { visible: false, dimmerActive: false };

  componentDidUpdate(prevProps) {
    if (this.props.visible !== prevProps.visible)
      this.setState({
        visible: this.props.visible,
        dimmerActive: this.props.dimmerActive
      });
  }

  render() {
    const { visible, dimmerActive } = this.state;
    const { closeSidebar, auth, profile } = this.props;
    const authenticated = auth.isLoaded && !auth.isEmpty;

    return (
      <Dimmer active={dimmerActive} onClickOutside={closeSidebar}>
        <Sidebar
          as={Menu}
          animation="overlay"
          icon="labeled"
          inverted
          vertical
          visible={visible}
          width="thin"
          style={{ backgroundColor: '#54a0ff' }}
        >
          <Menu.Item>
            <Link to="/places">Kamp Yerleri</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/events">Kamp Tarihleri</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/people">Arkadaşlarım</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/about">Hakkımızda</Link>
          </Menu.Item>
          {authenticated && (
            <hr style={{ backgroundColor: 'white', margin: 0 }} />
          )}
          {authenticated && (
            <Menu.Item>
              <Image
                src={profile.photoURL || '/assets/user.png'}
                avatar
                style={{ marginBottom: 10 }}
              />
              <div>{profile.displayName}</div>
            </Menu.Item>
          )}
          {authenticated && (
            <Menu.Item>
              <Link to={`/profile/${auth.uid}`}>Profilim</Link>
            </Menu.Item>
          )}
          {authenticated && (
            <Menu.Item>
              <Link to="/settings">Ayarlarım</Link>
            </Menu.Item>
          )}
        </Sidebar>
      </Dimmer>
    );
  }
}

export default connect(
  mapState,
  actions
)(SidebarNav);
