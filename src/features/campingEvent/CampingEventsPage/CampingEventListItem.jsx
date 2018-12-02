import React, { Component } from 'react';
import { Segment, Item, Icon, List, Button } from 'semantic-ui-react';

import CampingEventListAttendee from './CampingEventListAttendee';
import image from '../../../user.png';

class CampingEventListItem extends Component {
  render() {
    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size="tiny" circular src={image} />
              <Item.Content>
                <Item.Header>Elmadağ Kampı</Item.Header>
                <Item.Description>
                  <a href="#!">Koray Demirci</a> tarafından oluşturuldu
                </Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <span>
            <Icon name="clock" /> 22 Aralık 2018 - 12:00 |
            <Icon name="marker" /> Ankara
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
          <Button color="teal" floated="right" content="View" />
        </Segment>
      </Segment.Group>
    );
  }
}

export default CampingEventListItem;
