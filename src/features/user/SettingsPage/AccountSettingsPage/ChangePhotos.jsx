import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import Dropzone from 'react-dropzone';
import Cropper from 'react-cropper';
import {
  Image,
  Icon,
  Segment,
  Header,
  Divider,
  Grid,
  Button,
  Card
} from 'semantic-ui-react';

import {
  uploadProfileImage,
  deletePhoto,
  setMainPhoto
} from '../../UserActions';
import 'cropperjs/dist/cropper.css';

const query = ({ auth }) => {
  return [
    {
      collection: 'users',
      doc: auth.uid,
      subcollections: [{ collection: 'photos' }],
      storeAs: 'photos'
    }
  ];
};

const actions = {
  uploadProfileImage,
  deletePhoto,
  setMainPhoto
};

const mapState = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  photos: state.firestore.ordered.photos,
  loading: state.async.loading
});

class ChangePhotos extends Component {
  state = {
    files: [],
    fileName: '',
    cropResult: null,
    image: {}
  };

  componentWillUnmount() {
    this.state.files.forEach(f => URL.revokeObjectURL(f.preview));
  }

  onDrop = files => {
    this.setState({
      files: files.map(file =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      ),
      fileName: files[0].name
    });
  };

  cropImage = () => {
    if (typeof this.refs.cropper === 'undefined') return;

    this.refs.cropper.getCroppedCanvas().toBlob(blob => {
      let imageUrl = URL.createObjectURL(blob);
      this.setState({
        cropResult: imageUrl,
        image: blob
      });
    }, 'image/jpeg');
  };

  cancelCrop = () => {
    this.setState({
      files: [],
      image: {}
    });
  };

  uploadImage = async () => {
    await this.props.uploadProfileImage(this.state.image, this.state.fileName);
    this.cancelCrop();
  };

  handleSetMainPhoto = photo => async () => {
    try {
      await this.props.setMainPhoto(photo);
    } catch (error) {}
  };

  handlePhotoDelete = photo => () => {
    this.props.deletePhoto(photo);
  };

  render() {
    const { loading, photos, profile } = this.props;
    let filteredPhotos;
    if (photos) {
      filteredPhotos = photos.filter(photo => {
        return photo.url !== profile.photoURL;
      });
    }

    return (
      <Segment>
        <Header color="teal" dividing size="large" content="Profil Resmi" />
        <Grid stackable>
          <Grid.Column width={8}>
            <Header size="small" content="1 - Resim ekle" />
            <Dropzone onDrop={this.onDrop} multiple={false}>
              <div style={{ padding: '20px', textAlign: 'center' }}>
                <Icon name="upload" size="big" />
                <Header content="Resmi buraya sürükleyin ya da buraya tıklayın" />
              </div>
            </Dropzone>
          </Grid.Column>

          <Grid.Column width={8}>
            <Header size="small" content="2 - Resmi Boyutlandır" />
            {this.state.files[0] && (
              <Cropper
                style={{ height: 200, width: '100%' }}
                ref="cropper"
                src={this.state.files[0].preview}
                aspectRatio={1}
                viewMode={0}
                dragMode="move"
                guides={false}
                scalable={true}
                cropBoxMovable={true}
                cropBoxResizable={true}
                crop={this.cropImage}
              />
            )}
          </Grid.Column>

          <Grid.Column width={8}>
            <Header size="small" content="3 - Resmi Yükle" />
            {this.state.files[0] && (
              <div>
                <Image
                  style={{ minHeight: '200px', minWidth: '200px' }}
                  src={this.state.cropResult}
                />
                <Button.Group>
                  <Button
                    loading={loading}
                    onClick={this.uploadImage}
                    style={{ width: '100px' }}
                    positive
                    icon="check"
                  />
                  <Button
                    disabled={loading}
                    onClick={this.cancelCrop}
                    style={{ width: '100px' }}
                    icon="close"
                  />
                </Button.Group>
              </div>
            )}
          </Grid.Column>
        </Grid>

        <Divider />
        <Header color="teal" content="Profil Resimleri" />

        <Card.Group doubling itemsPerRow={4}>
          <Card>
            <Image
              src={profile.photoURL || '/assets/user.png'}
              style={{ width: '100%' }}
            />
            <Button positive>Aktif</Button>
          </Card>
          {filteredPhotos &&
            filteredPhotos.length > 0 &&
            filteredPhotos.map(photo => (
              <Card key={photo.id}>
                <Image src={photo.url} style={{ width: '100%' }} />
                <div className="ui two buttons">
                  <Button
                    loading={loading}
                    onClick={this.handleSetMainPhoto(photo)}
                    basic
                    color="green"
                  >
                    Aktif
                  </Button>
                  <Button
                    onClick={this.handlePhotoDelete(photo)}
                    basic
                    icon="trash"
                    color="red"
                  />
                </div>
              </Card>
            ))}
        </Card.Group>
      </Segment>
    );
  }
}

export default compose(
  connect(
    mapState,
    actions
  ),
  firestoreConnect(auth => query(auth))
)(ChangePhotos);
