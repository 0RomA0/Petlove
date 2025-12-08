import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import style from './LoginForm.module.css';
import toast, { Toaster } from 'react-hot-toast';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logInUser } from '../../redux/auth/operations';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: { email: '', password: '' },
    mode: 'all',
    reValidateMode: 'onChange',
  });

  const onSubmit = async (values) => {
    dispatch(logInUser(values))
      .unwrap()
      .then(() => {
        reset();
        toast.success('Login was successful!');
        navigate('/profile');
      })
      .catch(() => {
        toast.error('Login failed!');
      });
  };

  const showSuccess = (field) => dirtyFields[field] && !errors[field];

  return (
    <div>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={style.inputContainer}>
          {/* Email */}
          <div
            className={`${style.emailInputContainer} ${
              errors.email || dirtyFields.email ? style.hasMessage : ''
            }`}
          >
            <input
              type="email"
              {...register('email')}
              placeholder="Email"
              className={`${style.input} ${
                errors.email
                  ? style.inputError
                  : showSuccess('email')
                  ? style.inputSuccess
                  : ''
              }`}
            />
            {(errors.email || dirtyFields.email) && (
              <svg
                className={
                  errors.email ? style.emailIconError : style.emailIconSuccess
                }
              >
                <use
                  href={`/sprite.svg#${
                    errors.email ? 'icon-cross-small' : 'icon-check'
                  }`}
                />
              </svg>
            )}
          </div>
          {(errors.email || dirtyFields.email) && (
            <p className={errors.email ? style.errorEmail : style.successEmail}>
              {errors.email ? errors.email.message : 'Email is correct'}
            </p>
          )}

          {/* Password */}
          <div
            className={`${style.passwordInputContainer} ${
              errors.password || dirtyFields.password ? style.hasMessage : ''
            }`}
          >
            <input
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              placeholder="Password"
              className={`${style.input} ${
                errors.password
                  ? style.inputError
                  : showSuccess('password')
                  ? style.inputSuccess
                  : ''
              }`}
            />
            {(errors.password || dirtyFields.password) && (
              <svg
                className={
                  errors.password
                    ? style.passwordIconError
                    : style.passwordIconSuccess
                }
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
          {(errors.password || dirtyFields.password) && (
            <p
              className={
                errors.password ? style.errorPassword : style.successPassword
              }
            >
              {errors.password ? errors.password.message : 'Password is secure'}
            </p>
          )}
        </div>

        <div className={style.contentContainer}>
          <button type="submit" className={style.btnForm}>
            Log In
          </button>
          <p className={style.text}>
            Don’t have an account?
            <NavLink to="/register" className={style.loginLink}>
              Register
            </NavLink>
          </p>
        </div>
      </form>

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
