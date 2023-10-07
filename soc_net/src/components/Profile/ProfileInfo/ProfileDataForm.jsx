import React from 'react';
import { Formik, Field, Form } from "formik";
import s from './ProfileInfo.module.css';
import * as Yup from 'yup';


const SignupSchema = Yup.object().shape({
    fullName: Yup.string()
        .min(2, 'Too Short!')
        .max(200, 'Too Long!')
        .required('Required'),
    login: Yup.string()
        .min(2, 'Too Short!')
        .max(200, 'Too Long!')
        .required('Required'),
    aboutMe: Yup.string()
        .min(2, 'Too Short!')
        .max(200, 'Too Long!')
        .required('Required'),
    lookingForAJobDescription: Yup.string()
        .min(2, 'Too Short!')
        .max(200, 'Too Long!')
        .required('Required'),
    // contacts: Yup.string()
    //     .min(2, 'Too Short!')
    //     .max(200, 'Too Long!')
    //     .required('Required'),
});


const ProfileDataForm = ({profile, saveProfile, setEditMode}) => {
    // console.log('ProfileDataForm start')
    return (
        <Formik
            initialValues={{ aboutMe: profile.aboutMe, lookingForAJob: profile.lookingForAJob, 
                lookingForAJobDescription: profile.lookingForAJobDescription, fullName: profile.fullName,
                login: profile.username, 
                contacts: {facebook: profile.contacts.facebook, website: profile.contacts.website, 
                    vk: profile.contacts.vk, twitter: profile.contacts.twitter, instagram: profile.contacts.instagram,
                    youtube: profile.contacts.youtube, github: profile.contacts.github, mainLink: profile.contacts.mainLink}}}
            onSubmit={async (values) => {
                // console.log('onSubmit start');
                saveProfile({'aboutMe': values.aboutMe, 'lookingForAJob': values.lookingForAJob, 
                'lookingForAJobDescription': values.lookingForAJobDescription,'fullName': values.fullName, 
                'login': values.login, 'facebook': values.contacts.facebook, 'website': values.contacts.website, 
                'vk': values.contacts.vk, 'twitter': values.contacts.twitter, 'instagram': values.contacts.instagram,
                'youtube': values.contacts.youtube, 'github': values.contacts.github, 'mainLink': values.contacts.mainLink})
                setEditMode(false)
                // console.log('onSubmit end');
            }}
            validationSchema={SignupSchema}
            >
                {({ errors, touched }) => (
                    <Form>
            
                
                    <div className={s.ProfileInfo}>
                        <div className={s.aboutMe}>

                                
                                <div className={errors.fullName && touched.fullName ? s.errors : null}>
                                    {errors.fullName && touched.fullName ? (
                                        <div>{errors.fullName}</div>
                                    ) : null}
                                    <b>Full name:</b>
                                    <Field placeholder={'full Name'} name={'fullName'} type={'input'} />
                                </div>

                                <div className={errors.login && touched.login ? s.errors : null}>
                                    {errors.login && touched.login ? (
                                        <div>{errors.login}</div>
                                    ) : null}
                                    <b>login:</b>
                                    <Field placeholder={'login'} name={'login'} type={'input'} />
                                </div>



                                <div className={errors.aboutMe && touched.aboutMe ? s.errors : null}>
                                    {errors.aboutMe && touched.aboutMe ? (
                                        <div>{errors.aboutMe}</div>
                                    ) : null}
                                    <b>About me:</b>
                                    <Field placeholder={'about Me'} name={'aboutMe'} type={'input'} />
                            </div>
                            <div className={errors.lookingForAJobDescription && touched.lookingForAJobDescription ? s.errors : null}>
                                    {errors.lookingForAJobDescription && touched.lookingForAJobDescription ? (
                                        <div>{errors.lookingForAJobDescription}</div>
                                    ) : null}
                                <b>Job Description:</b>
                                <Field placeholder={'Job Description'} name={'lookingForAJobDescription'} />
                            </div>
                            <div>
                                <b>Looking for a job:</b>
                                <Field placeholder={'looking For A Job'} type={'checkbox'} name={'lookingForAJob'} />
                            </div>
                            <button className={s.saveButton} type="submit">save</button>
                        </div>
    
                        <div className={s.contacts}>
                            <ul>

                                <h3>Contacts:</h3> {Object.keys(profile.contacts).map(key => {
                                    return <div key={key}>
                                        {key}: {<Field key={key} placeholder={key} name={'contacts.' + key} />}
                                        </div>
                                })}

                            </ul>
                        </div>
                    </div>
                    </Form>
                 )}
            
        
      </Formik>
    )
  }


  export default ProfileDataForm