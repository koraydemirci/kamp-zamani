import React from 'react';
import { Menu, Button } from 'semantic-ui-react';

const SignedOutMenu = ({ register, signIn }) => {
  return (
    <Menu.Item position="right">
      <Button onClick={signIn} basic inverted content="Giriş" />
      <Button
        onClick={register}
        basic
        inverted
        content="Üye Ol"
        style={{ marginLeft: '0.5em' }}
      />
    </Menu.Item>
  );
};

export default SignedOutMenu;
