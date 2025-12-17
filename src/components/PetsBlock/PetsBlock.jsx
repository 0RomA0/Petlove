import { useSelector } from 'react-redux';
import style from './PetsBlock.module.css';
import { selectPets } from '../../redux/auth/selectors';
import { NavLink } from 'react-router-dom';
import PetsList from '../PetsList/PetsList';

export default function PetsBlock() {
  const pets = useSelector(selectPets);
  return (
    <>
      <div className={style.btnTitleWrapper}>
        <h3 className={style.title}> My pets </h3>
        <NavLink to="/add-pet" className={style.btnAddPet}>
          Add pet
          <svg className={style.iconplus}>
            <use href="/sprite.svg#icon-plus" />
          </svg>
        </NavLink>
      </div>

      <PetsList pets={pets} />
    </>
  );
}
