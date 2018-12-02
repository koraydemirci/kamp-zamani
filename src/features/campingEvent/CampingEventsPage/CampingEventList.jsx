import React, { Component } from 'react';
import CampingEventListItem from './CampingEventListItem';

class CampingEventList extends Component {
  render() {
    return (
      <div>
        <CampingEventListItem />
        <CampingEventListItem />
      </div>
    );
  }
}

export default CampingEventList;
