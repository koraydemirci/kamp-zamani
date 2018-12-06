import React from 'react';
import ChangePassword from './ChangePassword';
import ChangePhotos from './ChangePhotos';

const AccountSettingsPage = () => {
  return (
    <div>
      <ChangePassword />
      <ChangePhotos />
    </div>
  );
};

export default AccountSettingsPage;
