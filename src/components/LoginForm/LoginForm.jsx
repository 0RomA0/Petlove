import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import style from './LoginForm.module.css';
import toast, { Toaster } from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

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
    toast.success('Login was successfully!');

    actions.resetForm();
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
        <Form className={style.form}>
          <div className={style.formContent}>
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
      </Formik>

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
