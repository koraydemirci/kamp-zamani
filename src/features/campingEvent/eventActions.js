import { toastr } from 'react-redux-toastr';

import firebase from '../../app/config/firebase';
import { createNewEvent } from '../../app/common/util/helpers';
import { FETCH_EVENTS } from './eventConstants';
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from '../async/asyncActions';

export const createEvent = event => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const user = firebase.auth().currentUser;
    const photoURL = getState().firebase.profile.photoURL;
    let newEvent = createNewEvent(user, photoURL, event);
    try {
      let createdEvent = await firestore.add(`events`, newEvent);
      await firestore.set(`event_attendee/${createdEvent.id}_${user.uid}`, {
        eventId: createdEvent.id,
        userUid: user.uid,
        eventDate: event.date,
        host: true,
        displayName: user.displayName,
        photoURL
      });
      toastr.success('Başarılı', 'Kamp tarihi oluşturuldu');
    } catch (error) {
      toastr.error('Hata!', 'Kamp tarihi oluşturulamadı');
    }
  };
};

export const updateEvent = event => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    try {
      await firestore.update(`events/${event.id}`, event);
      toastr.success('Başarılı', 'Etkinlik güncellendi');
    } catch (error) {
      console.log(error);
      toastr.error('Hata!', 'Etkinlik güncellenemedi');
    }
  };
};

export const cancelToggle = (cancelled, eventId) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();
  const message = cancelled
    ? 'Etkinlik aktive edildi'
    : 'Etkinlik iptal edildi';
  try {
    firestore.update(`events/${eventId}`, {
      cancelled: cancelled
    });
    toastr.success('Başarılı', message);
  } catch (error) {
    console.log(error);
    toastr.error('Hata!', 'Etkinlik güncellenemedi');
  }
};

export const getEventsForDashboard = lastEvent => async (
  dispatch,
  getState
) => {
  let today = new Date(Date.now());
  const firestore = firebase.firestore();
  const eventsRef = firestore.collection('events');
  try {
    dispatch(asyncActionStart());
    let startAfter =
      lastEvent &&
      (await firestore
        .collection('events')
        .doc(lastEvent.id)
        .get());
    let query;

    lastEvent
      ? (query = eventsRef
          .where('date', '>=', today)
          .orderBy('date')
          .startAfter(startAfter)
          .limit(2))
      : (query = eventsRef
          .where('date', '>=', today)
          .orderBy('date')
          .limit(2));

    let querySnap = await query.get();

    if (querySnap.docs.length === 0) {
      dispatch(asyncActionFinish());
      return querySnap;
    }

    let events = [];

    for (let i = 0; i < querySnap.docs.length; i++) {
      let evt = { ...querySnap.docs[i].data(), id: querySnap.docs[i].id };
      events.push(evt);
    }
    dispatch({ type: FETCH_EVENTS, payload: { events } });
    dispatch(asyncActionFinish());
    return querySnap;
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};
