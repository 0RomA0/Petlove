import LoginForm from '../../components/LoginForm/LoginForm';
import style from './LoginPage.module.css';

export default function LoginPage() {
  return (
    <div className={style.container}>
      <div className={style.content}>
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
