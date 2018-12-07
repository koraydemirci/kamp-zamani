import React, { Component } from 'react';
import { Segment, Grid, Icon } from 'semantic-ui-react';
import Script from 'react-load-script';
import MapContainer from '../../../app/common/map/MapContainer';

class CampingEventPageInfo extends Component {
  state = {
    scriptLoaded: false
  };

  handleScriptLoaded = () => this.setState({ scriptLoaded: true });

  render() {
    const {
      event: { description, date, city, markerLocation }
    } = this.props;

    return (
      <Segment.Group>
        {!this.state.scriptLoaded && (
          <Script
            url="https://maps.googleapis.com/maps/api/js?key=AIzaSyC_3h84p1JJpl_a0Th2Y34HpTozfQuzJ18&libraries=places"
            onLoad={this.handleScriptLoaded}
          />
        )}
        <Segment attached="top">
          <Grid>
            <Grid.Column width={1}>
              <Icon size="large" color="teal" name="info" />
            </Grid.Column>
            <Grid.Column width={15}>
              <p>{description}</p>
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment attached>
          <Grid verticalAlign="middle">
            <Grid.Column width={1}>
              <Icon name="calendar" size="large" color="teal" />
            </Grid.Column>
            <Grid.Column width={15}>
              <span>
                {' '}
                {date &&
                  date.toDate().toLocaleDateString('tr', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
              </span>
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment attached>
          <Grid verticalAlign="middle">
            <Grid.Column width={1}>
              <Icon name="marker" size="large" color="teal" />
            </Grid.Column>
            <Grid.Column width={11}>
              <span>{city}</span>
            </Grid.Column>
          </Grid>
        </Segment>
        {false && <MapContainer cityLatLng={markerLocation} />}
      </Segment.Group>
    );
  }
}

export default CampingEventPageInfo;
