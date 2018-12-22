import { SubmissionError, reset } from 'redux-form';
import { toastr } from 'react-redux-toastr';
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
    toastr.success('Başarılı', 'Üyeliğiniz başarıyla oluşturuldu');
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

export const updatePassword = creds => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  const user = firebase.auth().currentUser;
  try {
    const credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      creds.oldPassword
    );
    await user.reauthenticateAndRetrieveDataWithCredential(credential);

    await user.updatePassword(creds.newPassword1);
    await dispatch(reset('account'));
    toastr.success('Başarılı', 'Şifreniz değiştirildi');
  } catch (error) {
    throw new SubmissionError({
      _error: 'Şifreniz değiştirilirken hata oluştu'
    });
  }
};

export const resetPasswordByEmail = value => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  try {
    firebase.auth().sendPasswordResetEmail(value.email);
    toastr.success('Başarılı', 'Şifrenizi yenilemek için email gönderildi');
    dispatch(closeModal());
  } catch (error) {
    throw new SubmissionError({
      _error: 'Şifreniz değiştirilirken hata oluştu'
    });
  }
};
