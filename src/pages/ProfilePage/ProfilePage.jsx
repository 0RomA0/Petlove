import { useLocation } from 'react-router-dom';
import style from './ProfilePage.module.css';
import MyNotices from '../../components/MyNotices/MyNotices';
import { useEffect } from 'react';
import LogOutBtn from '../../components/LogOutBtn/LogOutBtn';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { getCurrentUserFull } from '../../redux/auth/operations';
import PetsBlock from '../../components/PetsBlock/PetsBlock';
import UserInfoForm from '../../components/UserInfoForm/UserInfoForm';
import EditUserBtn from '../../components/EditUserBtn/EditUserBtn';
import Header from '../../components/Header/Header';

export default function ProfilePage() {
  const { pathname } = useLocation();
  const isProfilePage = pathname === '/profile';

  const dispatch = useDispatch();
  const loggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (loggedIn) {
      dispatch(getCurrentUserFull());
    }
  }, [dispatch, loggedIn]);

  return (
    <div className={style.container}>
      <Header className={style.profilePageHeader} />

      <div className={style.wrapper}>
        <div className={style.leftContainer}>
          <EditUserBtn />
          <UserInfoForm />

          <div className={style.contentWrapper}>
            <PetsBlock />
            <LogOutBtn isProfilePage={isProfilePage} />
          </div>
        </div>

        <MyNotices />
      </div>
    </div>
  );
}
