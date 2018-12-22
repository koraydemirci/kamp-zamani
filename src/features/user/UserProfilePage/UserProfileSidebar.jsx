import React from 'react';
import { Button, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const UserProfileSidebar = ({
  isCurrentUser,
  followUser,
  profile,
  isFollowing,
  unfollowUser
}) => {
  return (
    <Segment>
      {isCurrentUser && (
        <Button
          as={Link}
          to="/settings"
          positive
          fluid
          basic
          content="Profilimi Güncelle"
        />
      )}

      {!isCurrentUser && !isFollowing && (
        <Button
          onClick={() => followUser(profile)}
          positive
          fluid
          basic
          content="Takip Et"
        />
      )}

      {!isCurrentUser && isFollowing && (
        <Button
          onClick={() => unfollowUser(profile)}
          positive
          fluid
          basic
          content="Takibi Bırak"
        />
      )}
    </Segment>
  );
};

export default UserProfileSidebar;
