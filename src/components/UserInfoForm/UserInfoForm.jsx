import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import style from './UserInfoForm.module.css';
import { useState } from 'react';

export default function UserInfoForm() {
  const [photoPreview, setPhotoPreview] = useState(null);

  const validationSchema = Yup.object({
    name: Yup.string(),
    email: Yup.string().matches(
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      'Invalid email format',
    ),
    avatar: Yup.string().matches(
      /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/,
    ),
    phone: Yup.string().matches(
      /^\+38\d{10}$/,
      'Phone must be in format +380XXXXXXXXX',
    ),
  });

  const { register } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handlePhoto = (e) => {
    const file = e.target.files[0];

    setPhotoPreview(URL.createObjectURL(file));
  };

  return (
    <>
      <form>
        <div className={style.iconPhotoWrapper}>
          <div className={style.wrapperPaw}>
            <div className={style.svgWrapperPaw}>
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="User"
                  className={style.previewImg}
                />
              ) : (
                <svg className={style.iconPaw}>
                  <use href="/sprite.svg#icon-user" />
                </svg>
              )}
            </div>
          </div>

          <div className={style.photoWrapper}>
            <input
              id="photo"
              type="file"
              accept="image/*"
              className={style.hiddenFileInput}
              onChange={handlePhoto}
            />

            <label htmlFor="photo" className={style.uploadButton}>
              {'Upload photo'}
            </label>
          </div>
        </div>

        <h3 className={style.title}>My information</h3>
        <div className={style.inputWrapper}>
          <input
            type="text"
            {...register('name')}
            placeholder="Name"
            className={style.input}
          />
          <input
            type="email"
            {...register('email')}
            placeholder="name@gmail.com"
            className={style.input}
          />
          <input
            type="phone"
            {...register('phone')}
            placeholder="+380"
            className={style.input}
          />
        </div>
      </form>
      <div className={style.container}></div>
    </>
  );
}
