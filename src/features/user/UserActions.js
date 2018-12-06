import cuid from 'cuid';
import { toastr } from 'react-redux-toastr';

import {
  asyncActionError,
  asyncActionStart,
  asyncActionFinish
} from '../async/asyncActions';

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

export const setMainPhoto = photo => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  try {
    await firebase.updateProfile({
      photoURL: photo.url
    });
    toastr.success('Başarılı!', 'Profil resmi değiştirildi');
  } catch (error) {
    console.log(error);
    toastr.error('Hata', 'Profil resmi değiştirilemedi');
  }
};
