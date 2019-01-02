import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Header, Image, Tab, Segment } from 'semantic-ui-react';

const panes = [
  { menuItem: 'Hepsi', pane: { key: 'hepsi' } },
  { menuItem: 'Geçmiş', pane: { key: 'gecmis' } },
  { menuItem: 'Gelecek', pane: { key: 'gelecek' } },
  { menuItem: 'Düzenlediklerim', pane: { key: 'duzenledigim' } }
];

const UserProfileEvents = ({ events, eventsLoading, changeTab }) => {
  return (
    <Segment loading={eventsLoading}>
      <Header color="teal" content="Dahil Olduğu Etkinlikler" />
      <Tab
        onTabChange={(e, data) => changeTab(e, data)}
        panes={panes}
        menu={{ secondary: true, pointing: true, stackable: true }}
        style={{ marginBottom: 20 }}
      />
      {events && events.length === 0 ? (
        <p style={{ margin: 20 }}>Katıldığı bir etkinlik yok</p>
      ) : (
        <Card.Group doubling itemsPerRow={4}>
          {events &&
            events.map(event => (
              <Card as={Link} to={`/events/${event.id}`} key={event.id}>
                <Image
                  as="img"
                  alt="camping site"
                  src={`/assets/event-detail-page.jpg`}
                />
                <Card.Content>
                  <Card.Header textAlign="center">{event.title}</Card.Header>
                  <Card.Meta textAlign="center" style={{ marginTop: 10 }}>
                    <div>
                      {event.date &&
                        event.date.toDate().toLocaleDateString('tr', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                    </div>
                  </Card.Meta>
                </Card.Content>
              </Card>
            ))}
        </Card.Group>
      )}
    </Segment>
  );
};

export default UserProfileEvents;
