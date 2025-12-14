import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import style from './ModalEditUser.module.css';

export default function ModalEditUser() {
  const validationSchema = Yup.object({
    name: Yup.string(),
    email: Yup.string()
      .required('Email is required')
      .matches(
        /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
        'Invalid email format',
      ),
    avatar: Yup.string().matches(
      /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/,
    ),
    phone: Yup.string().phone(/^\+38\d{10}$/),
  });

  const { register } = useForm({
    resolver: yupResolver(validationSchema),
  });

  //   const handlePhoto = (e) => {
  //     const file = e.target.files[0];

  //     setPhotoPreview(URL.createObjectURL(file));
  //   };

  return (
    <>
      <form action="">
        <input type="text" {...register('name')} placeholder="Name" />
        <input
          type="email"
          {...register('email')}
          placeholder="name@gmail.com"
        />
        <input type="phone" {...register('phone')} placeholder="+380" />
      </form>
      <div className={style.container}></div>
    </>
  );
}
