import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

import eventReducer from '../../features/event/eventReducer';
import asyncReducer from '../../features/async/asyncReducer';
import modalsReducer from '../../features/modals/modalReducer';
import placeReducer from '../../features/place/placeReducer';
import sidebarReducer from '../../features/nav/sidebarReducer';

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  form: FormReducer,
  toastr: toastrReducer,
  modals: modalsReducer,
  events: eventReducer,
  places: placeReducer,
  async: asyncReducer,
  sidebar: sidebarReducer
});

export default rootReducer;
