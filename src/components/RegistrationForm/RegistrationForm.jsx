import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import style from './RegistrationForm.module.css';
import toast from 'react-hot-toast';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/auth/operations';

export default function RegistrationForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'all',
  });

  const onSubmit = (values) => {
    const data = {
      name: values.name,
      email: values.email,
      password: values.password,
    };
    dispatch(registerUser(data))
      .unwrap()
      .then(() => {
        reset();
        toast.success('Registration was successful!');
        navigate('/home');
      })
      .catch(() => {
        toast.error('Registration failed!');
      });
  };

  const showSuccess = (field) => dirtyFields[field] && !errors[field];

  return (
    <div>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        {/* Name */}
        <div className={style.formContent}>
          <div
            className={`${style.nameInputContainer} ${
              errors.name || dirtyFields.name ? style.hasMessage : ''
            }`}
          >
            <input
              type="text"
              placeholder="Name"
              {...register('name')}
              className={`${style.input} ${
                errors.name
                  ? style.inputError
                  : showSuccess('name')
                  ? style.inputSuccess
                  : ''
              }`}
            />
          </div>
          {errors.name && (
            <p className={style.errorName}>{errors.name.message}</p>
          )}

          {/* Email */}
          <div
            className={`${style.emailInputContainer} ${
              errors.email || dirtyFields.email ? style.hasMessage : ''
            }`}
          >
            <input
              type="email"
              placeholder="Email"
              {...register('email')}
              className={`${style.input} ${
                errors.email
                  ? style.inputError
                  : showSuccess('email')
                  ? style.inputSuccess
                  : ''
              }`}
            />
            {(errors.email || showSuccess('email')) && (
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
          {errors.email && (
            <p className={style.errorEmail}>{errors.email.message}</p>
          )}
          {showSuccess('email') && (
            <p className={style.successEmail}>Email is correct</p>
          )}

          {/* Password */}
          <div
            className={`${style.passwordInputContainer} ${
              errors.password || dirtyFields.password ? style.hasMessage : ''
            }`}
          >
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              {...register('password')}
              className={`${style.input} ${
                errors.password
                  ? style.inputError
                  : showSuccess('password')
                  ? style.inputSuccess
                  : ''
              }`}
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
            {(errors.password || showSuccess('password')) && (
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
          </div>
          {errors.password && (
            <p className={style.errorPassword}>{errors.password.message}</p>
          )}
          {showSuccess('password') && (
            <p className={style.successPassword}>Password is secure</p>
          )}

          {/* Confirm Password */}
          <div className={style.passwordInputContainer}>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm password"
              {...register('confirmPassword')}
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
          {errors.confirmPassword && (
            <p className={style.errorConfirmPassword}>
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className={style.contentContainer}>
          <button type="submit" className={style.btnForm}>
            Registration
          </button>
          <p className={style.text}>
            Already have an account?
            <NavLink to="/login" className={style.loginLink}>
              Login
            </NavLink>
          </p>
        </div>
      </form>
    </div>
  );
}
