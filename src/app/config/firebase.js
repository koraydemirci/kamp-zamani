import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDFscs9MB0Li52_FWOZLXawqFJPmVvN4qE',
  authDomain: 'kamp-zamani.firebaseapp.com',
  databaseURL: 'https://kamp-zamani.firebaseio.com',
  projectId: 'kamp-zamani',
  storageBucket: 'kamp-zamani.appspot.com',
  messagingSenderId: '972162467386'
};

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const settings = {
  timestampsInSnapshots: true
};
firestore.settings(settings);

export default firebase;
