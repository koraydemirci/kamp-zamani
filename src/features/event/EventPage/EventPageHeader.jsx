import React from 'react';
import { Segment, Image, Header, Button, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const EventPageHeader = ({
  event,
  event: { date, title, hostedBy, hostUid, id, photoURL },
  loading,
  isHost,
  isGoing,
  goingToEvent,
  cancelGoingToEvent,
  authenticated,
  openModal
}) => {
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: '0' }}>
        <Image src={photoURL || `/assets/event-detail-page.jpg`} fluid />
      </Segment>
      <Segment>
        <Header size="large" content={title} color="teal" />
        <p>
          <strong>
            <Link to={`/profile/${hostUid}`}> {hostedBy}</Link>
          </strong>{' '}
          tarafından{' '}
          {date &&
            date.toDate().toLocaleDateString('tr', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}{' '}
          tarihinde düzenlendi
        </p>
      </Segment>
      <Segment attached="bottom">
        {!isHost && (
          <div>
            {isGoing && !event.cancelled && (
              <Button onClick={() => cancelGoingToEvent(event)}>
                Katılımı İptal Et
              </Button>
            )}
            {!isGoing && authenticated && !event.cancelled && (
              <Button
                loading={loading}
                onClick={() => goingToEvent(event)}
                positive
                style={{ marginLeft: 10 }}
              >
                Kampa Katıl
              </Button>
            )}
            {!authenticated && !event.cancelled && (
              <Button
                loading={loading}
                onClick={() => openModal('UnauthModal')}
                positive
                style={{ marginLeft: 10 }}
              >
                Kampa Katıl
              </Button>
            )}
            {event.cancelled && !isHost && (
              <Label size="large" color="red" content="Etkinlik iptal edildi" />
            )}
          </div>
        )}

        {isHost && (
          <Button as={Link} to={`/manageEvent/${id}`} color="orange">
            Etkinliği Güncelle
          </Button>
        )}
      </Segment>
    </Segment.Group>
  );
};

export default EventPageHeader;
