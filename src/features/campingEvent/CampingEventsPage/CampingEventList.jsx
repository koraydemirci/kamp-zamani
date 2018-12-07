import React, { Component } from 'react';
import CampingEventListItem from './CampingEventListItem';

class CampingEventList extends Component {
  render() {
    const { events, attendees } = this.props;
    return (
      <div>
        {events &&
          events.length > 0 &&
          events.map(event => (
            <CampingEventListItem
              key={event.id}
              event={event}
              attendees={attendees}
            />
          ))}
      </div>
    );
  }
}

export default CampingEventList;
