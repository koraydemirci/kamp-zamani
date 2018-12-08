import React from 'react';
import { Button, Grid, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const UserProfileSidebar = ({ isCurrentUser }) => {
  return (
    <Grid.Column width={4}>
      <Segment>
        {isCurrentUser ? (
          <Button
            as={Link}
            to="/settings"
            color="teal"
            fluid
            basic
            content="Profilimi Güncelle"
          />
        ) : (
          <Button color="teal" fluid basic content="Takip Et" />
        )}
      </Segment>
    </Grid.Column>
  );
};

export default UserProfileSidebar;
