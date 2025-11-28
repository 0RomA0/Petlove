import style from './RegistrationPage.module.css';

import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';

export default function RegistrationPage() {
  return (
    <div className={style.container}>
      <div className={style.content}>
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
