import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import style from './ModalEditUser.module.css';
import { useState } from 'react';
import { useModalEffects } from '../../utils/useModalEffects';

export default function ModalEditUser({ isOpen, onClose }) {
  const [photoPreview, setPhotoPreview] = useState(null);

  useModalEffects(isOpen, onClose);

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

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
  });

  if (!isOpen) return null;

  const handlePhoto = (e) => {
    const file = e.target.files[0];

    setPhotoPreview(URL.createObjectURL(file));
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <div className={style.modalOverlay} onClick={onClose}>
        <div
          className={style.modalContent}
          onClick={(e) => e.stopPropagation()}
        >
          <button className={style.closeBtn} onClick={onClose}>
            <svg className={style.closeIcon}>
              <use href="/sprite.svg#icon-cross-small" />
            </svg>
          </button>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={style.iconPhotoWrapper}>
              <div className={style.wrapperPaw}>
                <h3 className={style.title}>Edit information</h3>

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
            </div>

            <div className={style.inputWrapper}>
              <div className={style.contentPhoto}>
                <div className={style.inputUrlWrapper}>
                  <input
                    className={style.inputImgUrl}
                    placeholder="Image URL"
                    {...register('avatar')}
                  />
                </div>

                <div>
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
                      <div className={style.iconCloudWrapper}>
                        <svg className={style.iconCloud}>
                          <use href="/sprite.svg#icon-upload-cloud" />
                        </svg>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

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

            <button type="submit" className={style.submitBtn}>
              Save
            </button>
          </form>
          <div className={style.container}></div>
        </div>
      </div>
    </>
  );
}
