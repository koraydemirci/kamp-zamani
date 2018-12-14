import cuid from 'cuid';
import { toastr } from 'react-redux-toastr';

import firebase from '../../app/config/firebase';
import {
  asyncActionError,
  asyncActionStart,
  asyncActionFinish
} from '../async/asyncActions';
import { FETCH_EVENTS } from '../campingEvent/eventConstants';

export const updateProfile = updatedUser => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  try {
    await firebase.updateProfile(updatedUser);
    toastr.success('Başarılı', 'Profil güncellendi');
  } catch (error) {
    console.log(error);
    toastr.error('Hata!', 'Profil güncellenemedi');
  }
};

export const uploadProfileImage = (file, fileName) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const imageName = cuid();
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;
  const path = `${user.uid}/user_images/${imageName}`;

  try {
    dispatch(asyncActionStart());
    const storageRef = firebase.storage().ref();
    const imageRef = storageRef.child(`${path}`);
    await imageRef.put(file);
    const downloadURL = await imageRef.getDownloadURL();
    const userDoc = await firestore.get({ collection: 'users', doc: user.uid });

    if (!userDoc.data().photoURL) {
      await firebase.updateProfile({
        photoURL: downloadURL
      });
      await user.updateProfile({
        photoURL: downloadURL
      });
    }

    await firestore.add(
      {
        collection: 'users',
        doc: user.uid,
        subcollections: [{ collection: 'photos' }]
      },
      {
        name: imageName,
        url: downloadURL
      }
    );
    dispatch(asyncActionFinish());
    toastr.success('Başarılı!', 'Resim eklendi');
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
    toastr.error('Hata!', 'Resim eklenemedi');
  }
};

export const deletePhoto = photo => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;
  try {
    await firebase.deleteFile(`${user.uid}/user_images/${photo.name}`);
    await firestore.delete({
      collection: 'users',
      doc: user.uid,
      subcollections: [{ collection: 'photos', doc: photo.id }]
    });
    toastr.success('Başarılı!', 'Resim silindi');
  } catch (error) {
    console.log(error);
    toastr.error('Hata', 'Resim silinemedi');
  }
};

export const setMainPhoto = photo => async (dispatch, getState) => {
  dispatch(asyncActionStart());
  const firestore = firebase.firestore();
  const user = firebase.auth().currentUser;
  const today = new Date(Date.now());
  let userDocRef = firestore.collection('users').doc(user.uid);
  let eventAttendeeRef = firestore.collection('event_attendee');
  try {
    let batch = firestore.batch();

    await batch.update(userDocRef, {
      photoURL: photo.url
    });

    let eventQuery = await eventAttendeeRef
      .where('userUid', '==', user.uid)
      .where('eventDate', '>', today);

    let eventQuerySnap = await eventQuery.get();

    for (let i = 0; i < eventQuerySnap.docs.length; i++) {
      let eventDocRef = await firestore
        .collection('events')
        .doc(eventQuerySnap.docs[i].data().eventId);
      let event = await eventDocRef.get();
      if (event.data().hostUid === user.uid) {
        batch.update(eventDocRef, {
          hostPhotoURL: photo.url,
          [`attendees.${user.uid}.photoURL`]: photo.url
        });
      } else {
        batch.update(eventDocRef, {
          [`attendees.${user.uid}.photoURL`]: photo.url
        });
      }
    }

    await batch.commit();
    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
    throw new Error('Problem setting main photo');
  }
};

export const goingToEvent = event => async (dispatch, getState) => {
  dispatch(asyncActionStart());
  const firestore = firebase.firestore();
  const user = firebase.auth().currentUser;
  const profile = getState().firebase.profile;
  const attendee = {
    going: true,
    joinDate: Date.now(),
    photoURL: profile.photoURL || '/assets/user.png',
    displayName: profile.displayName,
    host: false
  };
  try {
    let eventDocRef = firestore.collection('events').doc(event.id);
    let eventAttendeeDocRef = firestore
      .collection('event_attendee')
      .doc(`${event.id}_${user.uid}`);

    await firestore.runTransaction(async transaction => {
      await transaction.get(eventDocRef);
      await transaction.update(eventDocRef, {
        [`attendees.${user.uid}`]: attendee
      });
      await transaction.set(eventAttendeeDocRef, {
        eventId: event.id,
        userUid: user.uid,
        eventDate: event.date,
        host: false,
        displayName: profile.displayName,
        photoURL: profile.photoURL || '/assets/user.png'
      });
    });
    dispatch(asyncActionFinish());
    toastr.success('Başarılı', 'Etkinliğe katıldınız');
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
    toastr.error('Hata!', 'Etkinliğe katılamadınız');
  }
};

export const cancelGoingToEvent = event => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;
  try {
    await firestore.delete(`event_attendee/${event.id}_${user.uid}`);
    await firestore.update(`events/${event.id}`, {
      [`attendees.${user.uid}`]: firestore.FieldValue.delete()
    });
    toastr.success('Başarılı', 'Etkinlikten ayrıldınız ');
  } catch (error) {
    console.log(error);
    toastr.error('Hata', 'Etkinlikten ayrılamadınız');
  }
};

export const getUserEvents = (userUid, activeTab) => async (
  dispatch,
  getState
) => {
  dispatch(asyncActionStart());
  const firestore = firebase.firestore();
  const today = new Date(Date.now());
  let eventsRef = firestore.collection('event_attendee');
  let query;

  switch (activeTab) {
    case 1: // past events
      query = eventsRef
        .where('userUid', '==', userUid)
        .where('eventDate', '<=', today)
        .orderBy('eventDate', 'desc');
      break;
    case 2: // future events
      query = eventsRef
        .where('userUid', '==', userUid)
        .where('eventDate', '>=', today)
        .orderBy('eventDate');
      break;
    case 3: // hosted events
      query = eventsRef
        .where('userUid', '==', userUid)
        .where('host', '==', true)
        .orderBy('eventDate', 'desc');
      break;
    default:
      query = eventsRef
        .where('userUid', '==', userUid)
        .orderBy('eventDate', 'desc');
  }

  try {
    let querySnap = await query.get();
    let events = [];

    for (let i = 0; i < querySnap.docs.length; i++) {
      let evt = await firestore
        .collection('events')
        .doc(querySnap.docs[i].data().eventId)
        .get();
      events.push({ ...evt.data(), id: evt.id });
    }

    dispatch({ type: FETCH_EVENTS, payload: { events } });
    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};

export const followUser = userToFollow => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;
  const following = {
    photoURL: userToFollow.photoURL || '/assets/user.png',
    city: userToFollow.city || 'Bilinmiyor',
    displayName: userToFollow.displayName
  };
  try {
    await firestore.set(
      {
        collection: 'users',
        doc: user.uid,
        subcollections: [{ collection: 'following', doc: userToFollow.id }]
      },
      following
    );
    toastr.success('Başarılı', 'Takip ediliyor');
  } catch (error) {
    console.log(error);
  }
};

export const unfollowUser = userToUnfollow => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;
  try {
    await firestore.delete({
      collection: 'users',
      doc: user.uid,
      subcollections: [{ collection: 'following', doc: userToUnfollow.id }]
    });
    toastr.success('Başarılı', 'Takipten çıkarıldı');
  } catch (error) {
    console.log(error);
  }
};
