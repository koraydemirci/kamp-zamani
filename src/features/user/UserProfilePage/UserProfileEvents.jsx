import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Grid, Header, Image, Tab, Segment } from 'semantic-ui-react';

const panes = [
  { menuItem: 'Bütün Etkinliklerim', pane: { key: 'hepsi' } },
  { menuItem: 'Geçmiş Etkinliklerim', pane: { key: 'gecmis' } },
  { menuItem: 'Gelecek Etkinliklerim', pane: { key: 'gelecek' } },
  { menuItem: 'Düzenlediğim Etkinlikler', pane: { key: 'duzenledigim' } }
];

const UserProfileEvents = ({ events, eventsLoading, changeTab }) => {
  return (
    <Grid.Column width={12}>
      <Segment attached loading={eventsLoading}>
        <Header icon="calendar" content="Etkinliklerim" />
        <Tab
          onTabChange={(e, data) => changeTab(e, data)}
          panes={panes}
          menu={{ secondary: true, pointing: true }}
          style={{ marginBottom: 20 }}
        />

        <Card.Group itemsPerRow={4}>
          {events &&
            events.map(event => (
              <Card as={Link} to={`/campingEvents/${event.id}`} key={event.id}>
                <Image src={`/assets/event-detail-page.jpg`} />
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
      </Segment>
    </Grid.Column>
  );
};

export default UserProfileEvents;
