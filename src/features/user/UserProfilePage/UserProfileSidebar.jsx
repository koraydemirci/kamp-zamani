import React from 'react';
import { Button, Grid, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const UserProfileSidebar = ({
  isCurrentUser,
  followUser,
  profile,
  isFollowing,
  unfollowUser
}) => {
  return (
    <Grid.Column width={4}>
      <Segment>
        {isCurrentUser && (
          <Button
            as={Link}
            to="/settings"
            color="teal"
            fluid
            basic
            content="Profilimi Güncelle"
          />
        )}

        {!isCurrentUser && !isFollowing && (
          <Button
            onClick={() => followUser(profile)}
            color="teal"
            fluid
            basic
            content="Takip Et"
          />
        )}

        {!isCurrentUser && isFollowing && (
          <Button
            onClick={() => unfollowUser(profile)}
            color="teal"
            fluid
            basic
            content="Takibi Bırak"
          />
        )}
      </Segment>
    </Grid.Column>
  );
};

export default UserProfileSidebar;
