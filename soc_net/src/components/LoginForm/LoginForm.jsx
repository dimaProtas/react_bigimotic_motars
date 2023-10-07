import React from "react";
import style from './LoginForm.module.css';
import { connect } from 'react-redux';
import { login } from '../../reducer/auth-reduser.js';
import { Formik, Field, Form } from "formik";
import * as Yup from 'yup';
import { Navigate } from "react-router-dom";


const SignupSchema = Yup.object().shape({
    email: Yup.string()
        .min(2, 'Too Short!')
        .max(100, 'Too Long!')
        .required('Required'),
    password: Yup.string()
        .min(2, 'Too Short!')
        .max(100, 'Too Long!')
        .required('Required'),
});


export const LoginForm = ({login, captchaUrl}) => {
    return (
        <Formik
            initialValues={{ email: "", password: "", rememberMe: false, captcha: null }}
            onSubmit={async (values, { setSubmitting, setStatus }) => {
                // await new Promise((resolve) => setTimeout(resolve, 500));
                // alert(JSON.stringify(values, null, 2));
                // login(values.login, values.password, values.rememberMe, values.captcha, setStatus)
                login(values.email, values.password, values.rememberMe, values.captcha, setStatus)
                // console.log(values.login, values.password)
                setSubmitting(false);
                
            }}
            validationSchema={SignupSchema}
        >
            {({ errors, touched, status }) => (
                <div className={style.myForm}>
                    <Form>
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
                        <div className={style.errorsServer}>{status}</div>
                        <div>
                            <Field type={'checkbox'} name={'rememberMe'} />remember me
                        </div>
                        {captchaUrl && <img src={captchaUrl} alt='captcha' />}
                        {captchaUrl && <Field placeholder={'num'} name={'captcha'} type={'input'} />}
                        <div>
                            <button type="submit">Login</button>
                        </div>
                        
                    </Form>
                </div>

            )}
        </Formik>
    )
}

// const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)


export const Login = ({login, isAuth, captchaUrl}) => {

    if (isAuth === true) {
        return <Navigate to={"/profile"} />
    }

    return (
        <div>
            <h1 className={style.login}>Login</h1>
            <LoginForm login={login} captchaUrl={captchaUrl} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login})(Login)