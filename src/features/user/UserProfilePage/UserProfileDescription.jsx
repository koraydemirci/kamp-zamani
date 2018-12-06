import React from 'react';
import { Grid, Header, Icon, Item, List, Segment } from 'semantic-ui-react';

const UserProfileDescription = ({
  profile: { description, occupation, city, createdAt, interests }
}) => {
  let createdDate;
  if (createdAt) {
    createdDate = createdAt.toDate().toLocaleDateString('tr', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  return (
    <Grid.Column width={12}>
      <Segment>
        <Grid columns={2}>
          <Grid.Column width={10}>
            <Header color="teal" content="Özgeçmiş" />
            <p>
              <strong>Meslek:</strong> {occupation || 'Bilinmiyor'}
            </p>
            <p>
              <strong>Yaşadığı Yer:</strong> {city || 'Bilinmiyor'}
            </p>
            <p>
              <strong>Üyelik Başlangıcı: </strong> {createdDate}
            </p>
            <p>{description}</p>
          </Grid.Column>
          <Grid.Column width={6}>
            <Header color="teal" content="Sevdiği Doğa Sporları" />
            {interests ? (
              <List>
                {interests &&
                  interests.map((interest, index) => (
                    <Item key={index}>
                      <Icon name="heart" color="red" />
                      <Item.Content>{interest}</Item.Content>
                    </Item>
                  ))}
              </List>
            ) : (
              <p>Henüz sevdiği doğa sporlarını seçmedi</p>
            )}
          </Grid.Column>
        </Grid>
      </Segment>
    </Grid.Column>
  );
};

export default UserProfileDescription;
