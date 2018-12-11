import React from 'react';
import { Header, Segment, Feed, Sticky } from 'semantic-ui-react';
import CampingEventActivityItem from './CampingEventActivityItem';

const CampingEventActivity = ({ activities, contextRef }) => {
  return (
    <Sticky context={contextRef} offset={80}>
      <Header attached="top" content="Son Hareketler" />
      <Segment attached>
        <Feed>
          {activities &&
            activities.map(activity => (
              <CampingEventActivityItem key={activity.id} activity={activity} />
            ))}
        </Feed>
      </Segment>
    </Sticky>
  );
};

export default CampingEventActivity;
