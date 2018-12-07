import React from 'react';
import { Segment, List, Label, Item, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const CampingEventPageSidebar = ({ attendees }) => {
  console.log(attendees);
  return (
    <div>
      <Segment
        textAlign="center"
        style={{ border: 'none' }}
        attached="top"
        secondary
        inverted
        color="teal"
      >
        <p>{attendees && attendees.length} Kişi Katıldı</p>
      </Segment>
      <Segment attached>
        <List relaxed divided>
          {attendees &&
            attendees.map(attendee => (
              <Item key={attendee.id} style={{ position: 'relative' }}>
                {attendee.host && (
                  <Label
                    style={{ position: 'absolute' }}
                    color="orange"
                    ribbon="right"
                  >
                    Düzenleyen
                  </Label>
                )}
                <Image circular size="mini" src={attendee.photoURL} />
                <Item.Content verticalAlign="middle" style={{ marginTop: 5 }}>
                  <Item.Header as="h5">
                    <Link to={`/profile/${attendee.id}`}>
                      {attendee.displayName}
                    </Link>
                  </Item.Header>
                </Item.Content>
              </Item>
            ))}
        </List>
      </Segment>
    </div>
  );
};

export default CampingEventPageSidebar;
