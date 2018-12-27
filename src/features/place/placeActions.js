import cuid from 'cuid';
import { toastr } from 'react-redux-toastr';
import firebase from '../../app/config/firebase';

import {
  asyncActionError,
  asyncActionStart,
  asyncActionFinish
} from '../async/asyncActions';
import { FETCH_PLACES } from './placeConstants';

export const createPlace = (place, file) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(asyncActionStart());
    const firebase = getFirebase();
    const firestore = getFirestore();
    const user = firebase.auth().currentUser;
    const imageName = cuid();
    let newPlace = {
      ...place,
      postedByName: user.displayName,
      postedById: user.uid,
      created: Date.now()
    };
    try {
      let createdPlace = await firestore.add(`places`, newPlace);
      const imagePath = `${user.uid}/place_images/${imageName}`;

      const storageRef = firebase.storage().ref();
      const imageRef = storageRef.child(`${imagePath}`);
      await imageRef.put(file);
      const downloadURL = await imageRef.getDownloadURL();
      await firestore.add(
        {
          collection: 'places',
          doc: createdPlace.id,
          subcollections: [{ collection: 'photos' }]
        },
        {
          name: imageName,
          url: downloadURL
        }
      );
      await firestore.update(
        {
          collection: 'places',
          doc: createdPlace.id
        },
        {
          photoURL: downloadURL
        }
      );
      dispatch(asyncActionFinish());
      toastr.success('Başarılı', 'Kamp yeri eklendi');
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};

export const updatePlace = place => {
  return async (dispatch, getState) => {
    dispatch(asyncActionStart());
    const firestore = firebase.firestore();
    try {
      let placeDocRef = firestore.collection('places').doc(place.id);
      await placeDocRef.update(place);
      dispatch(asyncActionFinish());
      toastr.success('Başarılı', 'Etkinlik güncellendi');
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
      // toastr.error('Hata!', 'Etkinlik güncellenemedi');
    }
  };
};

export const addPlaceComment = (placeId, values, parentId) => async (
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
    await firebase.push(`place_chat/${placeId}`, newComment);
    toastr.success('Başarılı', 'Yorumunuz eklendi');
  } catch (error) {
    console.log(error);
    // toastr.error('Hata!', 'Yorum eklenemedi');
  }
};

export const getPlaces = city => async (dispatch, getState) => {
  dispatch(asyncActionStart());
  const firestore = firebase.firestore();
  let placesRef = firestore.collection('places');

  if (city && city !== 'Hepsi') {
    placesRef = firestore.collection('places').where('city', '==', city);
  } else {
    placesRef = firestore.collection('places');
  }

  try {
    let querySnap = await placesRef.get();
    let places = [];
    querySnap.forEach(doc => {
      places.push({ ...doc.data(), id: doc.id });
    });
    dispatch({ type: FETCH_PLACES, payload: { places } });
    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};
