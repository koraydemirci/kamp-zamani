import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Segment, Item, List, Button, Label } from 'semantic-ui-react';

import CampingEventListAttendee from './CampingEventListAttendee';
import { objectToArray } from '../../../app/common/util/helpers';

class CampingEventListItem extends Component {
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
          <Item.Group>
            <Item>
              <Item.Image size="tiny" circular src={hostPhotoURL} />
              <Item.Content>
                <Item.Header as={Link} to={`/campingEvents/${id}`}>
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
            <strong>Kampın Yeri: </strong> {city}
          </p>
        </Segment>
        <Segment secondary>
          <List horizontal>
            {attendees &&
              objectToArray(attendees).map(attendee => (
                <CampingEventListAttendee
                  key={attendee.id}
                  attendee={attendee}
                />
              ))}
          </List>
        </Segment>
        <Segment>
          <span>{description}</span>
        </Segment>
        <Segment secondary clearing>
          <Button
            as={Link}
            to={`/campingEvents/${id}`}
            color="teal"
            floated="left"
            content="AYRINTILAR"
          />
        </Segment>
      </Segment.Group>
    );
  }
}

export default CampingEventListItem;
