export const userDetailedQuery = ({ auth, userUid, match }) => {
  return [
    {
      collection: 'users',
      doc: userUid,
      storeAs: 'profile'
    },
    {
      collection: 'users',
      doc: userUid,
      subcollections: [{ collection: 'photos' }],
      storeAs: 'photos'
    },
    {
      collection: 'users',
      doc: auth.uid,
      subcollections: [{ collection: 'following', doc: match.params.id }],
      storeAs: 'following'
    }
  ];
};
