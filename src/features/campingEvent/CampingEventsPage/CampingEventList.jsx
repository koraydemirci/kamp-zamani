import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import CampingEventListItem from './CampingEventListItem';

class CampingEventList extends Component {
  render() {
    const {
      events,
      attendees,
      getNextEvents,
      loading,
      moreEvents
    } = this.props;
    return (
      <div>
        {events && events.length > 0 && (
          <InfiniteScroll
            pageStart={0}
            loadMore={getNextEvents}
            hasMore={!loading && moreEvents}
            initialLoad={false}
          >
            {events &&
              events.map(event => (
                <CampingEventListItem
                  key={event.id}
                  event={event}
                  attendees={attendees}
                />
              ))}
          </InfiniteScroll>
        )}
      </div>
    );
  }
}

export default CampingEventList;
