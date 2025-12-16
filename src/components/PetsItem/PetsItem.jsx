import { useDispatch } from 'react-redux';
import { deletePet } from '../../redux/auth/operations';
import style from './PetsItem.module.css';

export default function PetsItem({
  petId,
  petImg,
  petTitle,
  petName,
  petBirthday,
  petSex,
  petSpecies,
}) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deletePet(petId));
  };

  return (
    <div className={style.container}>
      <div className={style.imgWrapper}>
        <img className={style.imgPet} src={petImg} alt={petName} />
      </div>
      <div className={style.content}>
        <h3 className={style.title}>{petTitle}</h3>

        <div className={style.infoWrapper}>
          <p className={style.info}>
            Name <span className={style.infoTexr}> {petName} </span>
          </p>
          <p className={style.info}>
            Birthday <span className={style.infoTexr}> {petBirthday}</span>
          </p>
          <p className={style.info}>
            Sex <span className={style.infoTexr}> {petSex} </span>
          </p>
          <p className={style.info}>
            Species <span className={style.infoTexr}> {petSpecies} </span>
          </p>
        </div>
      </div>
      <button className={style.btnTrash} onClick={handleDelete}>
        <svg className={style.icon}>
          <use href="/sprite.svg#icon-trash" />
        </svg>
      </button>
    </div>
  );
}
