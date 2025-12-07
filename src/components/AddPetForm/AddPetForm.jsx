import * as Yup from 'yup';
import style from './AddPetForm.module.css';
import toast, { Toaster } from 'react-hot-toast';
// import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

export default function AddPetForm() {
  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    name: Yup.string().required('Name is required'),

    imgUrl: Yup.string()
      .matches(
        /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/,
        'Image URL must be a valid image link',
      )
      .required('Image URL is required'),

    species: Yup.string().required('Species is required'),

    birthday: Yup.string()
      .matches(/^\d{2}.\d{2}.\d{4}$/, 'Birthday must be DD.MM.YYYY')
      .required('Birthday is required'),

    sex: Yup.string().required('Sex is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: '',
      name: '',
      imgUrl: '',
      species: '',
      birthday: '',
      sex: '',
    },
  });

  const onSubmit = async () => {
    toast.success('Succes created!');
  };

  return (
    <div>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={style.iconWrapper}>
          <label className={style.sexLabel}>
            <input
              type="radio"
              value="female"
              {...register('sex')}
              className={style.radio}
            />
            <div className={style.svgWrapperGirl}>
              <svg className={style.iconGirl}>
                <use href="/sprite.svg#icon-female" />
              </svg>
            </div>
          </label>

          <label className={style.sexLabel}>
            <input
              type="radio"
              value="male"
              {...register('sex')}
              className={style.radio}
            />
            <div className={style.svgWrapperBoy}>
              <svg className={style.iconBoy}>
                <use href="/sprite.svg#icon-male" />
              </svg>
            </div>
          </label>

          <label className={style.sexLabel}>
            <input
              type="radio"
              value="both"
              {...register('sex')}
              className={style.radio}
            />
            <div className={style.svgWrapperBoth}>
              <svg className={style.iconBoth}>
                <use href="/sprite.svg#icon-both" />
              </svg>
            </div>
          </label>
        </div>
        {errors.sex && <p className={style.error}>{errors.sex.message}</p>}

        {/* Inputs */}
        <div className={style.inputContainer}>
          <input
            className={style.inputImgUrl}
            placeholder="Image URL"
            {...register('imgUrl')}
          />
          {errors.imgUrl && (
            <p className={style.error}>{errors.imgUrl.message}</p>
          )}

          <input
            className={style.inputTitle}
            placeholder="Title"
            {...register('title')}
          />
          {errors.title && (
            <p className={style.error}>{errors.title.message}</p>
          )}

          <input
            className={style.inputName}
            placeholder="Pet’s name"
            {...register('name')}
          />
          {errors.name && <p className={style.error}>{errors.name.message}</p>}

          <div className={style.wrapperBirthSpecie}>
            <div className={style.birthdayWrapper}>
              <input
                type="text"
                placeholder="00.00.0000"
                className={style.inputBirthday}
                {...register('birthday')}
              />
              <div className={style.iconCalendarWrapper}>
                <svg className={style.iconCalendar}>
                  <use href="/sprite.svg#icon-calendar-1" />
                </svg>
              </div>
            </div>
            {errors.birthday && (
              <p className={style.error}>{errors.birthday.message}</p>
            )}

            <input
              className={style.inputSpecies}
              placeholder="Species"
              {...register('species')}
            />
            {errors.species && (
              <p className={style.error}>{errors.species.message}</p>
            )}
          </div>
        </div>

        <div className={style.buttons}>
          <button type="button" className={style.backBtn}>
            Back
          </button>

          <button type="submit" className={style.submitBtn}>
            Submit
          </button>
        </div>
      </form>

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
