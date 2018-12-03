import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Segment, Item, Icon, List, Button } from 'semantic-ui-react';
import format from 'date-fns/format';

import CampingEventListAttendee from './CampingEventListAttendee';
import image from '../../../user.png';

class CampingEventListItem extends Component {
  render() {
    const { title, hostedBy, date, city, id } = this.props.event;

    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size="tiny" circular src={image} />
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
            <Icon name="clock" /> {format(date.toDate(), 'dddd Do MMMM')}|
            <Icon name="marker" /> {city}
          </span>
        </Segment>
        <Segment secondary>
          <List horizontal>
            <CampingEventListAttendee />
          </List>
        </Segment>
        <Segment clearing>
          <span>Description</span>
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
