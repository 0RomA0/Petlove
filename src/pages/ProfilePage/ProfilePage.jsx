import { NavLink, useLocation } from 'react-router-dom';
import style from './ProfilePage.module.css';
import MyNotices from '../../components/MyNotices/MyNotices';
import { useEffect, useState } from 'react';
import ModalEditUser from '../../components/ModalEditUser/ModalEditUser';
import LogOutBtn from '../../components/LogOutBtn/LogOutBtn';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn, selectPets } from '../../redux/auth/selectors';
import { getCurrentUserFull } from '../../redux/auth/operations';
import PetsList from '../../components/PetsList/PetsList';

export default function ProfilePage() {
  const { pathname } = useLocation();
  const isProfilePage = pathname === '/profile';

  const [openListFavorite, setOpenListFavorite] = useState(true);
  const [openListViewed, setOpenListViewed] = useState(false);

  const dispatch = useDispatch();
  const loggedIn = useSelector(selectIsLoggedIn);

  const pets = useSelector(selectPets);

  useEffect(() => {
    if (loggedIn) {
      dispatch(getCurrentUserFull());
    }
  }, [dispatch, loggedIn]);

  const handleFavoriteClick = () => {
    setOpenListFavorite(true);
    setOpenListViewed(false);
  };

  const handleViewedClick = () => {
    setOpenListViewed(true);
    setOpenListFavorite(false);
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.leftContainer}>
          <ModalEditUser />
          <div className={style.contentWrapper}>
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

            <LogOutBtn isProfilePage={isProfilePage} />
          </div>
        </div>

        <div className={style.rightContainer}>
          <div className={style.btnContainer}>
            <button
              className={`${style.btnFavorites} ${
                openListFavorite ? style.isActiveBtn : style.baseBtn
              }`}
              onClick={handleFavoriteClick}
            >
              My favorite pets
            </button>
            <button
              className={`${style.btnViewed} ${
                openListViewed ? style.isActiveBtn : style.baseBtn
              }`}
              onClick={handleViewedClick}
            >
              Viewed
            </button>
          </div>

          {openListFavorite && <MyNotices type="favorites" />}
          {openListViewed && <MyNotices type="viewed" />}
        </div>
      </div>
    </>
  );
}
