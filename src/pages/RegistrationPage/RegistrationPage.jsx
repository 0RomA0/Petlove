import style from './RegistrationPage.module.css';

import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';

export default function RegistrationPage() {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.infoWrapper}>
          <div className={style.divWrapper}>
            <div className={style.imgWrapper}>
              <img
                className={style.smallImgCat}
                srcSet="../../../cat-1x.png, ../../../cat-2x.png"
                src="../../../cat-1x.png"
                alt="cat"
              />
            </div>
          </div>

          <div className={style.infoCat}>
            <div className={style.infoCatText}>
              <p className={style.catName}> Jack </p>
              <p className={style.catBirthday}>
                Birthday:
                <span className={style.span}> 18.10.2021 </span>
              </p>
            </div>

            <p className={style.textInfo}>
              Jack is a gray Persian cat with green eyes. He loves to be
              pampered and groomed, and enjoys playing with toys.
            </p>
          </div>
        </div>

        <svg className={style.rectangle}>
          <use href="../../../Rectangle.svg" />
        </svg>
        <img
          className={style.imgCat}
          srcSet="../../../image-cat1x.png, ../../../image-cat2x.png"
          src="../../../image-cat1x.png"
          alt="cat"
        />
      </div>

      <div className={style.wrapper}>
        <div className={style.formWrapper}>
          <h2 className={style.formTitle}> Registration </h2>
          <p className={style.formText}>
            Thank you for your interest in our platform.
          </p>
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
}
