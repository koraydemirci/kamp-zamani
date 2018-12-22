import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Segment, Item, List, Button, Label } from 'semantic-ui-react';

import EventListAttendee from './EventListAttendee';
import { objectToArray } from '../../../app/common/util/helpers';

class EventListItem extends Component {
  render() {
    const {
      event: {
        title,
        hostedBy,
        created,
        date,
        city,
        id,
        hostUid,
        description,
        hostPhotoURL,
        cancelled,
        attendees
      }
    } = this.props;

    return (
      <Segment.Group>
        <Segment>
          <Item.Group unstackable>
            <Item>
              <Item.Image size="mini" circular src={hostPhotoURL} />
              <Item.Content>
                <Item.Header as={Link} to={`/events/${id}`}>
                  {title}
                </Item.Header>
                <Item.Description>
                  <Link to={`/profile/${hostUid}`}>{hostedBy}</Link> tarafından{' '}
                  {new Date(created).toLocaleDateString('tr', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}{' '}
                  tarihinde oluşturuldu
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
            <strong>Şehir: </strong> {city}
          </p>
        </Segment>
        <Segment secondary>
          <List horizontal>
            {attendees &&
              objectToArray(attendees).map(attendee => (
                <EventListAttendee key={attendee.id} attendee={attendee} />
              ))}
          </List>
        </Segment>
        <Segment>
          <span>{description}</span>
        </Segment>
        <Segment secondary clearing>
          <Button
            size="tiny"
            basic
            as={Link}
            to={`/events/${id}`}
            positive
            floated="left"
            content="AYRINTILAR"
          />
        </Segment>
      </Segment.Group>
    );
  }
}

export default EventListItem;
