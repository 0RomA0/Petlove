import { NavLink, useLocation } from 'react-router-dom';
import style from './ProfilePage.module.css';
import MyNotices from '../../components/MyNotices/MyNotices';
import { useEffect, useState } from 'react';
import LogOutBtn from '../../components/LogOutBtn/LogOutBtn';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { getCurrentUserFull } from '../../redux/auth/operations';
import PetsBlock from '../../components/PetsBlock/PetsBlock';
import UserInfoForm from '../../components/UserInfoForm/UserInfoForm';
import EditUserBtn from '../../components/EditUserBtn/EditUserBtn';

export default function ProfilePage() {
  const { pathname } = useLocation();
  const isProfilePage = pathname === '/profile';

  const [openListFavorite, setOpenListFavorite] = useState(true);
  const [openListViewed, setOpenListViewed] = useState(false);

  const dispatch = useDispatch();
  const loggedIn = useSelector(selectIsLoggedIn);

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
          <EditUserBtn />

          <UserInfoForm />

          <div className={style.contentWrapper}>
            <PetsBlock />

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
