import LoginForm from '../../components/LoginForm/LoginForm';
import style from './LoginPage.module.css';

export default function LoginPage() {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.infoWrapper}>
          <div className={style.divWrapper}>
            <div className={style.imgWrapper}>
              <img
                className={style.smallImgDog}
                srcSet="../../../dog-1x.png, ../../../dog-2x.png"
                src="../../../dog-1x.png"
                alt="cat"
              />
            </div>
          </div>

          <div className={style.infoDog}>
            <div className={style.infoDogText}>
              <p className={style.dogName}> Rich </p>
              <p className={style.dogBirthday}>
                Birthday:
                <span className={style.span}> 21.09.2020 </span>
              </p>
            </div>

            <p className={style.textInfo}>
              Rich would be the perfect addition <br /> to an active family that
              loves to play <br /> and go on walks. I bet he would love having a
              doggy playmate too!
            </p>
          </div>
        </div>

        <svg className={style.rectangle}>
          <use href="../../../Rectangle.svg" />
        </svg>
        <img
          className={style.imgDog}
          srcSet="../../../dog1x.png, ../../../dog2x.png"
          src="../../../dog1x.png"
          alt="cat"
        />
      </div>

      <div className={style.wrapper}>
        <div className={style.formWrapper}>
          <h2 className={style.formTitle}> Log in </h2>
          <p className={style.formText}>
            Welcome! Please enter your credentials to login to the platform:
          </p>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
