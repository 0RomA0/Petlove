import { NavLink } from 'react-router-dom';
import style from './ProfilePage.module.css';
import MyNotices from '../../components/MyNotices/MyNotices';

export default function ProfilePage() {
  return (
    <>
      <div className={style.container}>
        <div className={style.leftContainer}>
          <h1 className={style.title}> hi i`m ProfilePage</h1>
          <div className={style.contentWrapper}></div>
          <NavLink to="/add-pet" className={style.btnAddPet}>
            Add pet
            <svg className={style.iconplus}>
              <use href="/sprite.svg#icon-plus" />
            </svg>
          </NavLink>
        </div>

        <div className={style.rightContainer}>
          <div className={style.btnContainer}>
            <button className={style.btnFavorites}> My favorite pets </button>
            <button className={style.btnViewed}> Viewed </button>
          </div>

          <MyNotices />
        </div>
      </div>
    </>
  );
}
