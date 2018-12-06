import React from 'react';
import { Grid, Header, Image, Segment } from 'semantic-ui-react';

const UserProfilePhotos = ({ photos }) => {
  return (
    <Grid.Column width={12}>
      <Segment attached>
        <Header color="teal" content="Profil Resimleri" />

        <Image.Group size="small">
          {photos &&
            photos.map(photo => <Image key={photo.id} src={photo.url} />)}
        </Image.Group>
      </Segment>
    </Grid.Column>
  );
};

export default UserProfilePhotos;
