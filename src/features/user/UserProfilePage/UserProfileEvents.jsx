import React from 'react';
import { Card, Grid, Header, Image, Menu, Segment } from 'semantic-ui-react';

const UserProfileEvents = () => {
  return (
    <Grid.Column width={12}>
      <Segment attached>
        <Header color="teal" content="Etkinkiklerim" />
        <Menu secondary pointing>
          <Menu.Item content="Bütün Etkinliklerim" active />
          <Menu.Item content="Geçmiş Etkinliklerim" />
          <Menu.Item content="Gelecek Etkinliklerim" />
          <Menu.Item content="Düzenlediğim Etkinlikler" />
        </Menu>

        <Card.Group itemsPerRow={5}>
          <Card>
            <Image src={'/assets/categoryImages/drinks.jpg'} />
            <Card.Content>
              <Card.Header textAlign="center">Etkinlik İsmi</Card.Header>
              <Card.Meta textAlign="center">
                28th March 2018 at 10:00 PM
              </Card.Meta>
            </Card.Content>
          </Card>

          <Card>
            <Image src={'/assets/categoryImages/drinks.jpg'} />
            <Card.Content>
              <Card.Header textAlign="center">Etkinlik İsmi</Card.Header>
              <Card.Meta textAlign="center">
                28th March 2018 at 10:00 PM
              </Card.Meta>
            </Card.Content>
          </Card>
        </Card.Group>
      </Segment>
    </Grid.Column>
  );
};

export default UserProfileEvents;
