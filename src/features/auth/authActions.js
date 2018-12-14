import { SubmissionError } from 'redux-form';
import { closeModal } from '../modals/modalActions';

export const login = ({ email, password }) => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    try {
      await firebase.login({ email, password });
      dispatch(closeModal());
    } catch (error) {
      console.log(error);
      throw new SubmissionError({
        _error: 'Kullanıcı adı ya da şifre hatalı'
      });
    }
  };
};

export const registerUser = ({ email, password, displayName }) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  try {
    await firebase.createUser(
      { email, password },
      {
        displayName,
        createdAt: firestore.FieldValue.serverTimestamp()
      }
    );

    const createdUser = firebase.auth().currentUser;
    await createdUser.updateProfile({
      displayName
    });
    dispatch(closeModal());
  } catch (error) {
    console.log(error);
    throw new SubmissionError({
      _error: 'Bu email adresi ile başka bir hesap açılmış'
    });
  }
};

export const socialLogin = selectedProvider => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  try {
    dispatch(closeModal());
    let user = await firebase.login({
      provider: selectedProvider,
      type: 'popup'
    });
    if (user.additionalUserInfo.isNewUser) {
      await firestore.set(
        { collection: 'users', doc: user.user.uid },
        {
          displayName: user.profile.displayName,
          photoURL: user.profile.avatarUrl,
          createdAt: firestore.FieldValue.serverTimestamp()
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
};
