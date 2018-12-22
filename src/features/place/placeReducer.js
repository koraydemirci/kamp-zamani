import { createReducer } from '../../app/common/util/createReducer';
import { FETCH_PLACES } from './placeConstants';

const initialState = [];

export const fetchPlaces = (state, payload) => {
  return payload.places;
};

export default createReducer(initialState, {
  [FETCH_PLACES]: fetchPlaces
});
