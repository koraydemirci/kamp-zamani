import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const PersonCard = ({ user: { id, photoURL, displayName, city } }) => {
  return (
    <Card as={Link} to={`/profile/${id}`}>
      <Image src={photoURL || '/assets/user.png'} />
      <Card.Content textAlign="center">
        <Card.Header content={displayName} />
      </Card.Content>
    </Card>
  );
};

export default PersonCard;
