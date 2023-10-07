import React from 'react';
import s from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostContainer from './MyPost/MyPostContainer';


const Profile = ({profile, store, status, updateUserStatus, isOwner, savePhoto, saveProfile, userId}) => {
  return (
    <div className={s.content}>
      <ProfileInfo savePhoto={savePhoto} 
      isOwner={isOwner} 
      profile={profile} 
      status={status} 
      updateUserStatus={updateUserStatus}
      saveProfile={saveProfile}
      userId={userId} />
      <MyPostContainer store={store} />
    </div>
  )
}

export default Profile