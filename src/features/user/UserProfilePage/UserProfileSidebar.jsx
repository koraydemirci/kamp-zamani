import React from 'react';
import { Button, Grid, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const UserProfileSidebar = () => {
  return (
    <Grid.Column width={4}>
      <Segment>
        <Button
          as={Link}
          to="/settings"
          color="teal"
          fluid
          basic
          content="Profilimi Güncelle"
        />
      </Segment>
    </Grid.Column>
  );
};

export default UserProfileSidebar;
