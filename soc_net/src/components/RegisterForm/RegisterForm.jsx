import React from "react";
import style from './RegisterForm.module.css';
import { connect } from 'react-redux';
import { register } from '../../reducer/auth-reduser.js';
import * as Yup from 'yup';
import { Formik, Field, Form } from "formik";   
import { Navigate } from "react-router-dom";


const SignupSchema = Yup.object().shape({
    fullName: Yup.string()
        .min(2, 'не менее 2-х символов!')
        .max(100, 'не более 100 символов!')
        .required('поле не заполнено!'),
    login: Yup.string()
        .min(2, 'не менее 2-х символов!')
        .max(100, 'не более 100 символов!')
        .required('поле не заполнено!'),
    email: Yup.string()
        .min(2, 'не менее 2-х символов!')
        .max(100, 'не более 100 символов!')
        .required('поле не заполнено!')
        .email('не правильный email!'), // Проверка на корректный формат email,
    password: Yup.string()
        .min(2, 'не менее 2-х символов!')
        .max(100, 'не более 100 символов!')
        .required('поле не заполнено!'),
    repidPassword: Yup.string()
        .min(2, 'не менее 2-х символов!')
        .max(100, 'не более 100 символов!')
        .required('поле не заполнено!')
        .oneOf([Yup.ref('password'), null], 'не совподает с полем password'), // Добавлено для проверки совпадения паролей,
});


export const RegisterForm = ({register}) => {
    return (
        <Formik
            initialValues={{ fullName: "", login: "", email: "", password: "", repidPassword: ""}}
            onSubmit={async (values, { setSubmitting, setStatus }) => {
                // console.log(values.fullName, values.login, values.email, values.password, values.repidPassword)
                register(values.fullName, values.login, values.email, values.password, values.repidPassword, setStatus)
                setSubmitting(false)
            }}
            validationSchema={SignupSchema}
        >
            {({ errors, touched, status }) => (
                <div className={style.myForm}>
                        <Form>
                            <div className={errors.fullName && touched.fullName ? style.errors : null}>
                                {errors.fullName && touched.fullName ? (
                                    <div>{errors.fullName}</div>
                                ) : null}
                                <Field placeholder={'First Name Last Name'} name={'fullName'} type={'input'} />
                            </div>
                            <div className={errors.login && touched.login ? style.errors : null}>
                                {errors.login && touched.login ? (
                                    <div>{errors.login}</div>
                                ) : null}
                                <Field placeholder={'login'} name={'login'} type={'input'} />
                            </div>
                            <div className={errors.email && touched.email ? style.errors : null}>
                                {errors.email && touched.email ? (
                                    <div>{errors.email}</div>
                                ) : null}
                                <Field placeholder={'Email'} name={'email'} type={'input'} />
                            </div>
                            <div className={errors.password && touched.password ? style.errors : null}>
                                {errors.password && touched.password ? (
                                    <div>{errors.password}</div>
                                ) : null}
                                <Field placeholder={'Password'} name={'password'} type={'password'} />
                            </div>
                            <div className={errors.repidPassword && touched.repidPassword ? style.errors : null}>
                                {errors.repidPassword && touched.repidPassword ? (
                                    <div>{errors.repidPassword}</div>
                                ) : null}
                                <Field placeholder={'Repid password'} name={'repidPassword'} type={'password'} />
                            </div>

                            <div className={style.errorsServer}>{status}</div>

                            <div>
                                <button type="submit">Register</button>
                            </div>
                            
                        </Form>
                    </div>
            )}
        </Formik>
    )
}


export const Register = ({register, isAuth}) => {

    if (isAuth === true) {
        return <Navigate to={"/profile"} />
    }

    return (
        <div>
            <h1 className={style.login}>Register</h1>
            <RegisterForm register={register} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {register})(Register)
