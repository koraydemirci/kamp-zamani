import React from 'react';
import { Segment, Image, Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const placePageHeader = ({
  place: { created, title, postedByName, postedById, id, photoURL },
  loading,
  isPublisher
}) => {
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: '0' }}>
        <Image
          as="img"
          alt="camping site"
          src={photoURL || `/assets/event-detail-page.jpg`}
          fluid
        />
      </Segment>
      <Segment>
        <Header size="large" content={title} color="teal" />
        <p>
          <strong>
            {' '}
            <Link to={`/profile/${postedById}`}> {postedByName}</Link>
          </strong>{' '}
          tarafından{' '}
          {created &&
            new Date(created).toLocaleDateString('tr', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}{' '}
          tarihinde eklendi
        </p>
      </Segment>
      {isPublisher && (
        <Segment attached="bottom">
          {' '}
          <Button
            loading={loading}
            as={Link}
            to={`/editPlace/${id}`}
            color="orange"
          >
            Kamp Yerini Güncelle
          </Button>
        </Segment>
      )}
    </Segment.Group>
  );
};

export default placePageHeader;
