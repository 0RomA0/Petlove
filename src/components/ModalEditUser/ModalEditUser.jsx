import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState, useEffect } from 'react';
import style from './ModalEditUser.module.css';
import { useModalEffects } from '../../utils/useModalEffects';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser, getCurrentUserFull } from '../../redux/auth/operations';
import { selectUser } from '../../redux/auth/selectors';
import toast from 'react-hot-toast';

export default function ModalEditUser({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [photoPreview, setPhotoPreview] = useState(null);

  useModalEffects(isOpen, onClose);

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .matches(
        /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
        'Invalid email format',
      )
      .required('Email is required'),
    avatar: Yup.string().matches(
      /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/,
      'Invalid image URL',
    ),
    phone: Yup.string()
      .matches(/^\+38\d{10}$/, 'Phone must be in format +380XXXXXXXXX')
      .required('Phone is required'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (isOpen && user) {
      reset({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        avatar: user.avatar || '',
      });
    }
  }, [isOpen, user, reset]);

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (file) setPhotoPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (data) => {
    try {
      await dispatch(updateUser(data)).unwrap();
      toast.success('User updated successfully!');
      onClose();
      dispatch(getCurrentUserFull());
    } catch (error) {
      console.error('Update error:', error);
      toast.error(error || 'Update failed');
    }
  };

  if (!isOpen) return null;

  return (
    <div className={style.modalOverlay} onClick={onClose}>
      <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
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
                {errors.avatar && (
                  <p className={style.errorText}>{errors.avatar.message}</p>
                )}
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
                  Upload photo
                  <div className={style.iconCloudWrapper}>
                    <svg className={style.iconCloud}>
                      <use href="/sprite.svg#icon-upload-cloud" />
                    </svg>
                  </div>
                </label>
              </div>
            </div>

            <input
              type="text"
              {...register('name')}
              placeholder="Name"
              className={style.input}
            />
            {errors.name && (
              <p className={style.errorText}>{errors.name.message}</p>
            )}

            <input
              type="email"
              {...register('email')}
              placeholder="name@gmail.com"
              className={style.input}
            />
            {errors.email && (
              <p className={style.errorText}>{errors.email.message}</p>
            )}

            <input
              type="phone"
              {...register('phone')}
              placeholder="+380"
              className={style.input}
            />
            {errors.phone && (
              <p className={style.errorText}>{errors.phone.message}</p>
            )}
          </div>

          <button type="submit" className={style.submitBtn}>
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
