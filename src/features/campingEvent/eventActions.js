import { toastr } from 'react-redux-toastr';

import { createNewEvent } from '../../app/common/util/helpers';
import { DELETE_EVENT, FETCH_EVENTS } from './eventConstants';

export const fetchEvents = events => {
  return {
    type: FETCH_EVENTS,
    payload: events
  };
};

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

export const deleteEvent = eventId => {
  return {
    type: DELETE_EVENT,
    payload: {
      eventId
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
