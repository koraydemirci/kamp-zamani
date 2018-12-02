import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

const SocialLogin = ({ socialLogin }) => {
  return (
    <div>
      <Button
        onClick={() => socialLogin('facebook')}
        type="button"
        style={{ marginBottom: '10px' }}
        fluid
        color="facebook"
      >
        <Icon name="facebook" />
        Facebook İle Giriş
      </Button>

      <Button
        onClick={() => socialLogin('google')}
        type="button"
        fluid
        color="google plus"
      >
        <Icon name="google plus" />
        Google İle Giriş
      </Button>
    </div>
  );
};

export default SocialLogin;
