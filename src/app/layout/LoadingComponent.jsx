import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

const LoadingComponent = ({ inverted }) => {
  return (
    <Dimmer inverted={inverted} active={true}>
      <Loader content="Yüklüyor..." size="large" />
    </Dimmer>
  );
};

export default LoadingComponent;
