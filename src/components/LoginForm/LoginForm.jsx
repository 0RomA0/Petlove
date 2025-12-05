import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import style from './LoginForm.module.css';
import toast, { Toaster } from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logInUser } from '../../redux/auth/operations';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    email: Yup.string()
      .required('Email is required')
      .matches(
        /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
        'Invalid email format',
      ),

    password: Yup.string()
      .required('Password is required')
      .min(7, 'Password must be at least 7 characters'),
  });

  const handleSubmit = (values, actions) => {
    dispatch(logInUser(values))
      .unwrap()
      .then(() => {
        actions.resetForm();
        toast.success('Login was successfully!');
      })
      .catch(() => {
        toast.error('Login was failed!');
      });
  };

  return (
    <div>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className={style.form}>
            <div className={style.formContent}>
              <div
                className={`${style.emailInputContainer} ${
                  touched.email && (errors.email || !errors.email)
                    ? style.hasMessage
                    : ''
                }`}
              >
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className={` ${style.input} ${
                    touched.email
                      ? errors.email
                        ? style.inputError
                        : style.inputSuccess
                      : ''
                  }`}
                />
                {touched.email && (
                  <svg
                    className={`${
                      errors.email
                        ? style.emailIconError
                        : style.emailIconSuccess
                    }`}
                  >
                    <use
                      href={`/sprite.svg#${
                        errors.email ? 'icon-cross-small' : 'icon-check'
                      }`}
                    />
                  </svg>
                )}
              </div>
              {touched.email &&
                (errors.email ? (
                  <ErrorMessage
                    name="email"
                    component="p"
                    className={style.errorEmail}
                  />
                ) : (
                  <p className={style.successEmail}>Email is correct</p>
                ))}
              <div className={style.passwordInputContainer}>
                <Field
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  className={` ${style.input} ${
                    touched.password
                      ? errors.password
                        ? style.inputError
                        : style.inputSuccess
                      : ''
                  }`}
                />
                {touched.password && (
                  <svg
                    className={`${
                      errors.password
                        ? style.passwordIconError
                        : style.passwordIconSuccess
                    }`}
                  >
                    <use
                      href={`/sprite.svg#${
                        errors.password ? 'icon-cross-small' : 'icon-check'
                      }`}
                    />
                  </svg>
                )}
                <button
                  type="button"
                  className={style.eyeBtn}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <svg className={style.eyeIcon}>
                    <use
                      href={`/sprite.svg#${
                        showPassword ? 'icon-eye' : 'icon-eye-off'
                      }`}
                    />
                  </svg>
                </button>
              </div>

              {touched.password &&
                (errors.password ? (
                  <ErrorMessage
                    name="password"
                    component="p"
                    className={style.errorPassword}
                  />
                ) : (
                  <p className={style.successPassword}>Password is secure</p>
                ))}
            </div>

            <div className={style.contentContainer}>
              <button type="submit" className={style.btnForm}>
                Log In
              </button>
              <p className={style.text}>
                Don’t have an account?
                <NavLink to={'/register'} className={style.loginLink}>
                  Register
                </NavLink>
              </p>
            </div>
          </Form>
        )}
      </Formik>

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
