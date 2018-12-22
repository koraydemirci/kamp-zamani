import React from 'react';
import { Header, Item, Segment } from 'semantic-ui-react';

const UserProfileHeader = ({
  profile: { photoURL, displayName, occupation, city }
}) => {
  return (
    <Segment>
      <Item.Group unstackable>
        <Item>
          <Item.Image
            avatar
            size="small"
            src={photoURL || '/assets/user.png'}
          />
          <Item.Content verticalAlign="bottom">
            <Header color="teal" as="h2">
              {displayName}
            </Header>
            <p style={{ marginBottom: 0 }}>
              {occupation || 'Mesleği bilinmiyor'}
            </p>
            <p>{city || 'Yaşadığı yer bilinmiyor'}</p>
          </Item.Content>
        </Item>
      </Item.Group>
    </Segment>
  );
};

export default UserProfileHeader;
