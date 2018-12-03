import React, { Component } from 'react';
import CampingEventListItem from './CampingEventListItem';

class CampingEventList extends Component {
  render() {
    const { events } = this.props;
    return (
      <div>
        {events &&
          events.length > 0 &&
          events.map(event => (
            <CampingEventListItem key={event.title} event={event} />
          ))}
      </div>
    );
  }
}

export default CampingEventList;
