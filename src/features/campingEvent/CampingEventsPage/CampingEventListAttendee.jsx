import React, { Component } from 'react';
import { List, Image } from 'semantic-ui-react';

import image from '../../../user.png';

class CampingEventListAttendee extends Component {
  render() {
    return (
      <List.Item>
        <Image as="a" size="mini" circular src={image} />
      </List.Item>
    );
  }
}

export default CampingEventListAttendee;
