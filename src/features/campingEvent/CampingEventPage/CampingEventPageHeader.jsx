import React from 'react';
import { Segment, Image, Item, Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const eventImageStyle = {
  filter: 'brightness(70%)'
};

const eventImageTextStyle = {
  position: 'absolute',
  bottom: '5%',
  left: '5%',
  width: '100%',
  height: 'auto',
  color: 'white'
};

const CampingEventPageHeader = ({
  event,
  event: { date, title, hostedBy, id },
  isHost,
  isGoing,
  goingToEvent,
  cancelGoingToEvent
}) => {
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: '0' }}>
        <Image
          src={`/assets/event-detail-page.jpg`}
          fluid
          style={eventImageStyle}
        />
        <Segment basic style={eventImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={title}
                  style={{ color: 'white' }}
                />
                <p>
                  {date &&
                    date.toDate().toLocaleDateString('tr', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                </p>
                <p>
                  <strong>{hostedBy}</strong> tarafından düzenlendi
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment attached="bottom">
        {!isHost && (
          <div>
            {isGoing ? (
              <Button onClick={() => cancelGoingToEvent(event)}>
                Katılımı İptal Et
              </Button>
            ) : (
              <Button
                onClick={() => goingToEvent(event)}
                color="teal"
                style={{ marginLeft: 10 }}
              >
                Kampa Katıl
              </Button>
            )}
          </div>
        )}

        {isHost && (
          <Button as={Link} to={`/manageCampingEvent/${id}`} color="orange">
            Etkinliği Güncelle
          </Button>
        )}
      </Segment>
    </Segment.Group>
  );
};

export default CampingEventPageHeader;
