import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import style from './RegistrationForm.module.css';
import toast, { Toaster } from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/auth/operations';

export default function RegistrationForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Name is required')
      .min(2, 'Minimum 2 characters')
      .max(30, 'Maximum 30 characters'),

    email: Yup.string()
      .required('Email is required')
      .matches(
        /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
        'Invalid email format',
      ),

    password: Yup.string()
      .required('Password is required')
      .min(7, 'Password must be at least 7 characters'),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm your password'),
  });

  const handleSubmit = (values, actions) => {
    const data = {
      name: values.name,
      email: values.email,
      password: values.password,
    };
    dispatch(registerUser(data))
      .unwrap()
      .then(() => {
        actions.resetForm();
        toast.success('Registration was successfully!');
      })
      .catch(() => {
        toast.error('Registration was failed!');
      });
  };

  return (
    <div>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={style.form}>
          <div className={style.formContent}>
            <Field
              type="text"
              name="name"
              placeholder="Name"
              className={style.input}
            />
            <ErrorMessage name="name" component="p" className={style.error} />

            <Field
              type="email"
              name="email"
              placeholder="Email"
              className={style.input}
            />
            <ErrorMessage name="email" component="p" className={style.error} />

            <div className={style.passwordInputContainer}>
              <Field
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                className={style.input}
              />
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
            <ErrorMessage
              name="password"
              component="p"
              className={style.error}
            />

            <div className={style.passwordInputContainer}>
              <Field
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm password"
                className={style.input}
              />
              <button
                type="button"
                className={style.eyeBtn}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <svg className={style.eyeIcon}>
                  <use
                    href={`/sprite.svg#${
                      showConfirmPassword ? 'icon-eye' : 'icon-eye-off'
                    }`}
                  />
                </svg>
              </button>
            </div>
            <ErrorMessage
              name="confirmPassword"
              component="p"
              className={style.error}
            />
          </div>

          <div className={style.contentContainer}>
            <button type="submit" className={style.btnForm}>
              Registration
            </button>
            <p className={style.text}>
              Already have an account?
              <NavLink to={'/login'} className={style.loginLink}>
                Login
              </NavLink>
            </p>
          </div>
        </Form>
      </Formik>

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
