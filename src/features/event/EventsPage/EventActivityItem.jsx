import React, { Component } from 'react';
import { Feed } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import eoLocale from 'date-fns/locale/tr';

class EventActivityItem extends Component {
  renderSummary = activity => {
    switch (activity.type) {
      case 'newEvent':
        return (
          <div>
            <Link to={{ pathname: '/events/' + activity.eventId }}>
              {activity.title}
            </Link>
            {' - '}
            <Feed.User
              as={Link}
              to={{ pathname: '/profile/' + activity.hostUid }}
            >
              {activity.hostedBy}
            </Feed.User>{' '}
            {'tarafından düzenlendi'}
          </div>
        );
      case 'reactivatedEvent':
        return (
          <div>
            <Link to={{ pathname: '/events/' + activity.eventId }}>
              {activity.title}
            </Link>
            {' - '}
            <Feed.User
              as={Link}
              to={{ pathname: '/profile/' + activity.hostUid }}
            >
              {activity.hostedBy}
            </Feed.User>{' '}
            {'tarafından tekrar aktive edildi'}
          </div>
        );
      case 'cancelledEvent':
        return (
          <div>
            <Link to={{ pathname: '/events/' + activity.eventId }}>
              {activity.title}
            </Link>
            {' - '}
            <Feed.User
              as={Link}
              to={{ pathname: '/profile/' + activity.hostUid }}
            >
              {activity.hostedBy}
            </Feed.User>{' '}
            {'tarafından iptal edildi'}
          </div>
        );
      default:
        return;
    }
  };

  render() {
    const { activity } = this.props;

    return (
      <Feed.Event>
        <Feed.Label>
          <img src={activity.photoURL || '/assets/user.png'} alt="p" />
        </Feed.Label>
        <Feed.Content>
          <Feed.Summary>{this.renderSummary(activity)}</Feed.Summary>
          <Feed.Meta>
            <Feed.Date>
              {distanceInWordsToNow(activity.timestamp.toDate(), {
                locale: eoLocale
              })}{' '}
              önce
            </Feed.Date>
          </Feed.Meta>
        </Feed.Content>
      </Feed.Event>
    );
  }
}

export default EventActivityItem;
