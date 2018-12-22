import React, { Component } from 'react';
import { Segment, Grid, Icon } from 'semantic-ui-react';
import InfoMapContainer from '../../../app/common/map/InfoMapContainer';

class EventPageInfo extends Component {
  render() {
    const {
      event: { description, date, markerLocation, location }
    } = this.props;

    return (
      <Segment.Group>
        <Segment attached="top">
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
              <Icon name="marker" size="large" color="teal" />
            </Grid.Column>
            <Grid.Column width={11}>
              <span>{location}</span>
            </Grid.Column>
          </Grid>
        </Segment>
        {markerLocation && <InfoMapContainer cityLatLng={markerLocation} />}
      </Segment.Group>
    );
  }
}

export default EventPageInfo;
