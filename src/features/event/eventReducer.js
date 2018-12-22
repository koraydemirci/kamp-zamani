import { createReducer } from '../../app/common/util/createReducer';
import { FETCH_EVENTS } from './eventConstants';

const initialState = [];

export const fetchEvents = (state, payload) => {
  return payload.events;
};

export default createReducer(initialState, {
  [FETCH_EVENTS]: fetchEvents
});
