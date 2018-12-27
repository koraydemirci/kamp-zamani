import React from 'react';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import { Card, Image, Button } from 'semantic-ui-react';

const PlaceCard = ({ id, photoURL, title, city }) => {
  return (
    <Card fluid>
      <LazyLoad
        height={700}
        placeholder={<Image src="/assets/placeholder-image.png" />}
      >
        <Image src={photoURL || `/assets/placeholder-image.png`} />
      </LazyLoad>

      <Card.Content>
        <Card.Header>{title}</Card.Header>
        <Card.Description as="h5">
          <b>Şehir:</b> {city}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button
          size="tiny"
          basic
          as={Link}
          to={`/places/${id}`}
          positive
          floated="left"
          content="AYRINTILAR"
        />
      </Card.Content>
    </Card>
  );
};

export default PlaceCard;
