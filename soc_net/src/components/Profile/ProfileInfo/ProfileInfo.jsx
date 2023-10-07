import React, {useState, createRef} from 'react';
import Preloader from '../../Common/Preloader/Preloader';
import s from './ProfileInfo.module.css';
import ava from '../../../img/ava.png';
// import ProfileStatus from './ProfileStatus.jsx';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import ProfileDataForm from './ProfileDataForm.jsx';
import { GrEdit } from "react-icons/gr";
import { TiImage } from "react-icons/ti";


const ProfileInfo = ({profile, status, updateUserStatus, isOwner, saveProfile, userId, savePhoto}) => {

  let [editMode, setEditMode] = useState(false)

  if (!profile) {
    return <Preloader />
  }
  return (
    <div>
      <div>
        <img className={s.motoImg} src='https://img4.goodfon.ru/original/2560x1024/3/db/chernyi-fon-mototsikl-mototsiklist.jpg' alt="moto" />
      </div>
      <div className={s.avatar_box}>
        <div className={s.avatar}>
          {/* <img src='https://i.pinimg.com/originals/cc/9f/1f/cc9f1f361a5504957c816106fff75d21.png' /> */}
          {/* <img className={s.avatarImg} src={props.profile.photos.large} /> */}
          {profile.photos.large ? <img className={s.avatarImg} src={profile.photos.large} alt="ava" /> 
          : <img className={s.avatarImg} src={ava} alt="ava" /> }
          
        </div>
          {editMode 
          ? <ProfileDataForm profile={profile} saveProfile={saveProfile} setEditMode={setEditMode} /> 
            : <ProfileData profile={profile} savePhoto={savePhoto}
            updateUserStatus={updateUserStatus} goToEditMode={() => {setEditMode(true)}}
            status={status} isOwner={isOwner} userId={userId} />}

          
        
      </div>
    </div>
  )
}

const ProfileData = ({profile, status, savePhoto, updateUserStatus, isOwner, goToEditMode, userId}) => {
  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0])
    }
  }

  const ref = createRef();

  return (
    <div className={s.ProfileInfo}>
      <div className={s.aboutMe}>
        <h2>
          {profile.fullName}{isOwner && 
          <span>
            <span onClick={goToEditMode}><GrEdit className={s.icon} /></span>
            <span className={s.addPhoto} onClick={() => ref.current?.click()}><TiImage /></span>
            <input type='file' ref={ref} onChange={onMainPhotoSelected} style={{ display: "none" }} />
            
          </span>
          }

          {/* {isOwner &&
          <span>
            <span className={s.addPhoto} onClick={() => ref.current?.click()}><TiImage /></span>
            <input type='file' ref={ref} onChange={onMainPhotoSelected} style={{ display: "none" }} />
          </span>


          // <input type='file' onChange={onMainPhotoSelected} />
        } */}
        </h2>


        <ProfileStatusWithHooks status={status.status} updateUserStatus={updateUserStatus} userId={userId} />
        {/* <p>Статус: {props.profile.lookingForAJobDescription}</p> */}
        <p><b>About me:</b> {profile.aboutMe}</p>
        <p><b>Job Description: </b> {profile.lookingForAJobDescription}</p>
        <p><b>Looking for a job: </b>{profile.lookingForAJob ? 'Yes' : 'No'}</p>

      </div>
        
      <div className={s.contacts}>
        <ul>
          <h3>Contacts:</h3> {Object.keys(profile.contacts).map(key => {
            return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
          })}
        </ul>
      </div>         
          
          
        </div>
  )
}


const Contact = ({contactTitle, contactValue}) => {
  return (
    <div>
        {contactValue ? <li><b>{contactTitle}</b>: {contactValue}</li> : null}
    </div>
  )
}

export default ProfileInfo
