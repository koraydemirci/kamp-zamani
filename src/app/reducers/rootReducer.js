import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

import eventReducer from '../../features/campingEvent/eventReducer';
import asyncReducer from '../../features/async/asyncReducer';
import modalsReducer from '../../features/modals/modalReducer';

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  form: FormReducer,
  toastr: toastrReducer,
  modals: modalsReducer,
  events: eventReducer,
  async: asyncReducer
});

export default rootReducer;
