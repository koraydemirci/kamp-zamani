import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Segment, Item, List, Button, Label } from 'semantic-ui-react';
import { objectToArray } from '../../../app/common/util/helpers';

import CampingEventListAttendee from './CampingEventListAttendee';

class CampingEventListItem extends Component {
  render() {
    const {
      event: {
        title,
        hostedBy,
        date,
        city,
        id,
        hostUid,
        description,
        hostPhotoURL,
        cancelled
      },
      attendees
    } = this.props;
    console.log(attendees);
    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size="tiny" circular src={hostPhotoURL} />
              <Item.Content>
                <Item.Header>{title}</Item.Header>
                <Item.Description>
                  <Link to={`/profile/${hostUid}`}>{hostedBy}</Link> tarafından
                  oluşturuldu
                </Item.Description>
                {cancelled && (
                  <Label
                    style={{ top: '-40px' }}
                    ribbon="right"
                    color="red"
                    content="Bu etkinlik iptal edildi"
                  />
                )}
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <p>
            <strong>Kampın Tarihi: </strong>{' '}
            {date &&
              date.toDate().toLocaleDateString('tr', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
          </p>
          <p>
            <strong>Kampın Yeri: </strong> {city}
          </p>
        </Segment>
        <Segment secondary>
          <List horizontal>
            {attendees &&
              attendees
                .filter(attendee => attendee.eventId === id)
                .map(attendee => (
                  <CampingEventListAttendee
                    key={attendee.id}
                    attendee={attendee}
                  />
                ))}
          </List>
        </Segment>
        <Segment clearing>
          <span>{description}</span>
          <Button as="a" color="red" floated="right" content="Delete" />
          <Button
            as={Link}
            to={`/campingEvents/${id}`}
            color="teal"
            floated="right"
            content="View"
          />
        </Segment>
      </Segment.Group>
    );
  }
}

export default CampingEventListItem;
