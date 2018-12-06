import React from 'react';
import { Grid, Header, Item, Segment } from 'semantic-ui-react';

const UserProfileHeader = ({
  profile: { photoURL, displayName, occupation, city }
}) => {
  return (
    <Grid.Column width={16}>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image
              avatar
              size="small"
              src={photoURL || '/assets/user.png'}
            />
            <Item.Content verticalAlign="bottom">
              <Header color="teal" as="h1">
                {displayName}
              </Header>
              <br />
              <Header as="h3">{occupation || 'Mesleği bilinmiyor'}</Header>
              <br />
              <Header as="h3">{city || 'Yaşadığı yer bilinmiyor'}</Header>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
    </Grid.Column>
  );
};

export default UserProfileHeader;
