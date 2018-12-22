import { toastr } from 'react-redux-toastr';
import compareAsc from 'date-fns/compare_asc';

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
    dispatch(asyncActionStart());
    const firebase = getFirebase();
    const firestore = getFirestore();
    const user = firebase.auth().currentUser;
    const profile = getState().firebase.profile;
    let newEvent = createNewEvent(user, profile, event);
    try {
      let createdEvent = await firestore.add(`events`, newEvent);
      await firestore.set(`event_attendee/${createdEvent.id}_${user.uid}`, {
        eventId: createdEvent.id,
        userUid: user.uid,
        eventDate: event.date,
        host: true,
        displayName: profile.displayName,
        photoURL: profile.photoURL
      });
      dispatch(asyncActionFinish());
      toastr.success('Başarılı', 'Kamp tarihi oluşturuldu');
    } catch (error) {
      dispatch(asyncActionError());
      // toastr.error('Hata!', 'Kamp tarihi oluşturulamadı');
    }
  };
};

export const updateEvent = event => {
  return async (dispatch, getState) => {
    dispatch(asyncActionStart());
    const firestore = firebase.firestore();

    try {
      let eventDocRef = firestore.collection('events').doc(event.id);
      let dateEqual = compareAsc(
        Date(getState().firestore.ordered.events[0].date),
        event.date.toString()
      );

      if (dateEqual !== 0) {
        let batch = firestore.batch();
        await batch.update(eventDocRef, event);

        let eventAttendeeRef = firestore.collection('event_attendee');
        let eventAttendeeQuery = await eventAttendeeRef.where(
          'eventId',
          '==',
          event.id
        );
        let eventAttendeeQuerySnap = await eventAttendeeQuery.get();

        for (let i = 0; i < eventAttendeeQuerySnap.docs.length; i++) {
          let eventAttendeeDocRef = await firestore
            .collection('event_attendee')
            .doc(eventAttendeeQuerySnap.docs[i].id);
          await batch.update(eventAttendeeDocRef, {
            eventDate: event.date
          });
        }
        await batch.commit();
      } else {
        await eventDocRef.update(event);
      }
      dispatch(asyncActionFinish());
      toastr.success('Başarılı', 'Etkinlik güncellendi');
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
      // toastr.error('Hata!', 'Etkinlik güncellenemedi');
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
    ? 'Etkinlik iptal edildi'
    : 'Etkinlik aktive edildi';
  try {
    firestore.update(`events/${eventId}`, {
      cancelled: cancelled
    });
    toastr.success('Başarılı', message);
  } catch (error) {
    console.log(error);
    // toastr.error('Hata!', 'Etkinlik güncellenemedi');
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
          .orderBy('date', 'desc')
          .startAfter(startAfter)
          .limit(2))
      : (query = eventsRef
          .where('date', '>=', today)
          .orderBy('date', 'desc')
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

export const addEventComment = (eventId, values, parentId) => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  const profile = getState().firebase.profile;
  const user = firebase.auth().currentUser;
  let newComment = {
    parentId,
    displayName: profile.displayName,
    photoURL: profile.photoURL || '/assets/user.png',
    uid: user.uid,
    text: values.comment,
    date: Date.now()
  };
  try {
    await firebase.push(`event_chat/${eventId}`, newComment);
    toastr.success('Başarılı', 'Yorumunuz eklendi');
  } catch (error) {
    console.log(error);
    // toastr.error('Hata!', 'Yorum eklenemdi');
  }
};
