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
      <img src={petImg} alt={petName} />
      <h3>{petTitle}</h3>
      <button className={style.btnTrash} onClick={handleDelete}>
        <svg className={style.icon}>
          <use href="/sprite.svg#icon-trash" />
        </svg>
      </button>
      <p>Name: {petName}</p>
      <p>Birthday: {petBirthday}</p>
      <p>Sex: {petSex}</p>
      <p>Type: {petSpecies}</p>
    </div>
  );
}
