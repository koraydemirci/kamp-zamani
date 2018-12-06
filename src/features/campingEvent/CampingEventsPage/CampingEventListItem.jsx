import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Segment, Item, Icon, List, Button } from 'semantic-ui-react';
import { objectToArray } from '../../../app/common/util/helpers';

import CampingEventListAttendee from './CampingEventListAttendee';

class CampingEventListItem extends Component {
  render() {
    const {
      title,
      hostedBy,
      date,
      city,
      id,
      description,
      hostPhotoURL,
      attendees
    } = this.props.event;

    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size="tiny" circular src={hostPhotoURL} />
              <Item.Content>
                <Item.Header>{title}</Item.Header>
                <Item.Description>
                  <a href="#!">{hostedBy}</a> tarafından oluşturuldu
                </Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <span>
            <Icon name="clock" />{' '}
            {date.toDate().toLocaleDateString('tr', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}{' '}
            |
            <Icon name="marker" /> {city}
          </span>
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
