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
        _error: 'Login failed'
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
    dispatch(closeModal());
  } catch (error) {
    console.log(error);
    throw new SubmissionError({
      _error: error.message
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
    console.log();
    dispatch(closeModal());
    let user = await firebase.login({
      provider: selectedProvider,
      type: 'popup'
    });
    console.log(user);
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
