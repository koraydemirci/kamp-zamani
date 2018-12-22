import React from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

class InnerMap extends React.Component {
  render() {
    let lat, lng, markerPosition;
    if (this.props.cityLatLng) {
      lat = this.props.cityLatLng.lat;
      lng = this.props.cityLatLng.lng;
      markerPosition = {
        lat,
        lng
      };
    }
    return (
      <GoogleMap
        defaultZoom={12}
        defaultCenter={{ lat, lng }}
        onClick={this.onMapClick}
      >
        <Marker position={markerPosition} />
      </GoogleMap>
    );
  }
}

const Map = withGoogleMap(InnerMap);

class InfoMapContainer extends React.Component {
  render() {
    return (
      <div style={{ height: '100%' }}>
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

export default InfoMapContainer;
