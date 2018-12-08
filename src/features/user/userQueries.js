export const userDetailedQuery = ({ userUid }) => {
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
    }
  ];
};
