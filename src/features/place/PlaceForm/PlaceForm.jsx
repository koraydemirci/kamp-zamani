import React, { Component } from 'react';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';
import {
  Segment,
  Form,
  Button,
  Grid,
  Header,
  Image,
  Icon,
  Label
} from 'semantic-ui-react';
import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthGreaterThan
} from 'revalidate';
import Dropzone from 'react-dropzone';
import Cropper from 'react-cropper';

import { createPlace, updatePlace } from '../placeActions';
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import PlaceInput from '../../../app/common/form/PlaceInput';
import SelectInput from '../../../app/common/form/SelectInput';
import FormMapContainer from '../../../app/common/map/FormMapContainer';
import { citiesWithoutHepsiOption } from '../../../app/common/util/optionsList';

import 'cropperjs/dist/cropper.css';

const validate = combineValidators({
  title: isRequired({ message: 'Lütfen kamp yeri ismi giriniz' }),
  description: composeValidators(
    isRequired({
      message: 'Lütfen kamp yeri hakkında ayrıntılı açıklama yapınız'
    }),
    hasLengthGreaterThan(4)({
      message: 'Açıklama en az 20 harf olmalı'
    })
  )(),
  city: isRequired({ message: 'Lütfen şehir ismi giriniz' }),
  location: isRequired({ message: 'Lütfen konum belirleyiniz ' })
});

const mapState = (state, ownProps) => {
  const placeId = ownProps.match.params.id;
  let selectedPlace = {};
  if (state.firestore.ordered.places) {
    selectedPlace = state.firestore.ordered.places.filter(
      place => place.id === placeId
    )[0];
  }

  return {
    initialValues: selectedPlace,
    place: selectedPlace,
    loading: state.async.loading
  };
};

const actions = {
  createPlace,
  updatePlace
};

class placeForm extends Component {
  state = {
    cityLatLng: {},
    markerLocation: {},
    location: null,
    files: [],
    fileName: '',
    cropResult: null,
    image: {}
  };

  async componentDidMount() {
    const { firestore, match } = this.props;
    await firestore.setListener(`places/${match.params.id}`);
  }

  async componentWillUnmount() {
    const { firestore, match } = this.props;
    await firestore.unsetListener(`places/${match.params.id}`);
  }

  handleCitySelect = selectedCity => {
    if (Object.keys(selectedCity).length > 1) {
      const lat = selectedCity.geometry.location.lat();
      const lng = selectedCity.geometry.location.lng();
      this.setState({
        cityLatLng: { lat, lng },
        location: selectedCity.formatted_address
      });
    }
  };

  handleCampLocation = markerLocation => {
    this.setState({ markerLocation });
  };

  onFormSubmit = async values => {
    if (Object.keys(this.state.cityLatLng).length === 0) {
      throw new SubmissionError({
        _error:
          'Lütfen GOOGLE tarafından sunulan seçenekler arasından yer seçimi yapın'
      });
    }

    if (Object.keys(this.state.markerLocation).length === 0) {
      throw new SubmissionError({
        _error:
          'Lütfen GOOGLE tarafından sunulan haritaya konum iğnesini yerleştirin'
      });
    }

    if (!this.state.image.size) {
      throw new SubmissionError({
        _error: 'Lütfen resim yükleyin'
      });
    }

    if (Object.keys(this.state.markerLocation).length !== 0)
      values.markerLocation = this.state.markerLocation;
    values.location = this.state.location;

    if (this.props.initialValues && this.props.initialValues.id) {
      await this.props.updatePlace(values);
      this.props.history.goBack();
    } else {
      await this.props.createPlace(values, this.state.image);
      this.cancelCrop();
      this.props.history.push('/places');
    }
  };

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

  render() {
    const { loading, history, handleSubmit, error } = this.props;
    const { cityLatLng } = this.state;

    return (
      <Grid>
        <Grid.Column tablet={16} computer={12}>
          <Segment>
            <Header
              color="teal"
              content="Kamp Yerine Ait Detaylar"
              style={{ marginBottom: '1rem' }}
            />
            <Form onSubmit={handleSubmit(this.onFormSubmit)}>
              <Field
                name="title"
                type="text"
                label="Kamp Yerinin İsmi"
                component={TextInput}
                placeholder="Örnek: Darlık Barajı Kamp Alanı"
              />
              <Field
                name="description"
                label="Kamp Yeri Hakkındaki Diğer Bilgiler"
                component={TextArea}
                rows={6}
                placeholder="Ulaşım, konum, hava durumu, dikkat edilmesi gerekenler, vb."
              />
              <Header color="teal" content="Kamp Yerinin Konumu" />
              <Field
                name="city"
                label="Şehir"
                component={SelectInput}
                options={citiesWithoutHepsiOption}
                value="citiesWithoutHepsiOption"
                placeholder="Adana"
              />
              <Field
                label="Konum"
                name="location"
                component={PlaceInput}
                options={{
                  componentRestrictions: { country: 'tr' }
                }}
                placeholder="İlçe, köy, mahalle, vb."
                onSelect={this.handleCitySelect}
              />

              {Object.keys(cityLatLng).length !== 0 && (
                <div>
                  <p>Lütfen kamp yerinin konumunu harita üzerinde seçiniz</p>
                  <FormMapContainer
                    cityLatLng={cityLatLng}
                    onMapSelect={this.handleCampLocation}
                  />
                </div>
              )}
              <Header
                color="teal"
                content="Kamp Alanına Ait Resim"
                style={{ marginBottom: 20 }}
              />
              <Grid stackable style={{ marginBottom: 20 }}>
                <Grid.Column width={8}>
                  <Header size="small" content="1. Resim ekle" />
                  <Dropzone onDrop={this.onDrop} multiple={false}>
                    <div style={{ padding: '20px', textAlign: 'center' }}>
                      <Icon name="upload" size="big" />
                      <Header content="Resmi buraya sürükleyin ya da buraya tıklayın" />
                    </div>
                  </Dropzone>
                </Grid.Column>
                <Grid.Column width={8} />
                <Grid.Column width={8}>
                  <Header size="small" content="2. Resmi Boyutlandır" />
                  {this.state.files[0] && (
                    <Cropper
                      style={{ height: 200, width: '100%' }}
                      ref="cropper"
                      src={this.state.files[0].preview}
                      aspectRatio={16 / 9}
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
                  <Header
                    size="small"
                    content="3. Resmi yüklemek ve formu göndermek için aşağıdaki gönder butonuna basınız"
                  />
                  {this.state.files[0] && (
                    <div>
                      <Image
                        style={{ minWidth: '200px' }}
                        src={this.state.cropResult}
                      />
                    </div>
                  )}
                </Grid.Column>
                <Grid.Column width={8}>
                  {error && (
                    <Label basic color="red" style={{ marginBottom: 10 }}>
                      {error}
                    </Label>
                  )}
                </Grid.Column>
              </Grid>
              <Button loading={loading} positive type="submit">
                Gönder
              </Button>
              <Button disabled={loading} onClick={history.goBack} type="button">
                İptal
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default withFirestore(
  connect(
    mapState,
    actions
  )(
    reduxForm({ form: 'placeForm', enableReinitialize: true, validate })(
      placeForm
    )
  )
);
