import style from './AddPetPage.module.css';
import AddPetForm from '../../components/AddPetForm/AddPetForm';

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
          </div>

          <AddPetForm />
        </div>
      </div>
    </div>
  );
}
