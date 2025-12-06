import style from './AddPetPage.module.css';

export default function AddPetPage() {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <svg className={style.rectangle}>
          <use href="../../../Rectangle.svg" />
        </svg>
        <img
          className={style.imgDog}
          srcSet="../../../dogAddform-1x.png, ../../../dogAddform-2x.png"
          src="../../../dogAddform-1x.png"
          alt="dog"
        />
      </div>

      <div className={style.wrapper}>
        <div className={style.formWrapper}>
          <div className={style.textWrapper}>
            <h2 className={style.formTitle}> Add my pet / </h2>
            <p className={style.formText}>Personal details </p>
            <p> svg</p>
          </div>

          {/* <LoginForm /> */}
        </div>
      </div>
    </div>
  );
}
