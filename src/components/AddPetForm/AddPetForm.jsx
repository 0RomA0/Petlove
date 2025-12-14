import * as Yup from 'yup';
import style from './AddPetForm.module.css';
import toast, { Toaster } from 'react-hot-toast';
// import { NavLink } from 'react-router-dom';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSpecies } from '../../redux/filters/selectors';
import { fetchSpecies } from '../../redux/filters/operations';
import { NavLink } from 'react-router-dom';

export default function AddPetForm() {
  const [speciesOpen, setSpeciesOpen] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSpecies());
  }, [dispatch]);

  const species = useSelector(selectSpecies);

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
    reset,
    setValue,
    control,
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

  const selectedSpecies = useWatch({
    control,
    name: 'species',
  });

  const handlePhoto = (e) => {
    const file = e.target.files[0];

    setPhotoPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (data) => {
    toast.success('Succes created!');
    console.log(data);
    reset();
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

        <div className={style.wrapperPaw}>
          <div className={style.svgWrapperPaw}>
            {photoPreview ? (
              <img src={photoPreview} alt="Pet" className={style.previewImg} />
            ) : (
              <svg className={style.iconPaw}>
                <use href="/sprite.svg#icon-paw" />
              </svg>
            )}
          </div>
        </div>

        {/* Inputs */}
        <div className={style.inputContainer}>
          <div className={style.contentPhoto}>
            <div className={style.inputUrlWrapper}>
              <input
                className={style.inputImgUrl}
                placeholder="Image URL"
                {...register('imgUrl')}
              />
              {errors.imgUrl && (
                <p className={style.error}>{errors.imgUrl.message}</p>
              )}
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
            <div>
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
            </div>

            {/* species */}
            <div>
              {' '}
              <input type="hidden" {...register('species')} />
              <div className={style.selectWrapper}>
                <div
                  className={style.selectHeader}
                  onClick={() => setSpeciesOpen(!speciesOpen)}
                >
                  {selectedSpecies || 'Type of pet'}
                  <div className={style.iconChevronWrapper}>
                    <svg className={style.icon}>
                      <use
                        href={`/sprite.svg#${
                          speciesOpen ? 'icon-chevron-up' : 'icon-chevron-down'
                        }`}
                      />
                    </svg>
                  </div>
                </div>

                {speciesOpen && (
                  <ul className={style.selectList}>
                    {species.map((item) => (
                      <li
                        key={item}
                        className={item === selectedSpecies ? style.active : ''}
                        onClick={() => {
                          setValue('species', item, {
                            shouldValidate: true,
                            shouldDirty: true,
                          });
                          setSpeciesOpen(false);
                        }}
                      >
                        {item}
                      </li>
                    ))}
                    <li
                      className={style.clearItem}
                      onClick={() => {
                        setValue('species', '', {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                        setSpeciesOpen(false);
                      }}
                    >
                      Clear
                    </li>
                  </ul>
                )}
              </div>
              {errors.species && (
                <p className={style.error}>{errors.species.message}</p>
              )}
            </div>
          </div>
        </div>

        <div className={style.buttonsWrapper}>
          <NavLink to="/profile" className={style.backBtn}>
            Back
          </NavLink>

          <button type="submit" className={style.submitBtn}>
            Submit
          </button>
        </div>
      </form>

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
