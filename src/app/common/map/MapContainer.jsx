import React from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

class InnerMap extends React.Component {
  state = {
    isMarkerShown: false,
    markerPosition: null
  };

  onMapClick = e => {
    this.setState({
      markerPosition: e.latLng,
      isMarkerShown: true
    });

    const markerLocation = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    };
    this.props.onMapSelect(markerLocation);
  };

  render() {
    const {
      cityLatLng: { lat, lng }
    } = this.props;

    return (
      <GoogleMap
        defaultZoom={12}
        defaultCenter={{ lat, lng }}
        onClick={this.onMapClick}
      >
        {this.state.isMarkerShown && (
          <Marker position={this.state.markerPosition} />
        )}
      </GoogleMap>
    );
  }
}

const Map = withGoogleMap(InnerMap);

class MapContainer extends React.Component {
  render() {
    return (
      <div style={{ height: '100%' }}>
        <p>Lütfen kamp yapılacak yeri harita üzerinde seçiniz</p>
        <Map
          cityLatLng={this.props.cityLatLng}
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC_3h84p1JJpl_a0Th2Y34HpTozfQuzJ18&libraries=places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          onMapSelect={this.props.onMapSelect}
        />
      </div>
    );
  }
}

export default MapContainer;

// componentDidMount() {
//   this.setState({ location: this.props.location });
// }

// static getDerivedStateFromProps(nextProps, prevState) {
//   if (nextProps.location !== prevState.location) {
//     return {
//       location: nextProps.location
//     };
//   }

//   return prevState;
// }
