import LogOutBtn from '../LogOutBtn/LogOutBtn';
import UserBar from '../UserBar/UserBar';
import style from './UserNav.module.css';

export default function UserNav({ isHome }) {
  return (
    <>
      <div className={style.container}>
        <LogOutBtn isHome={isHome} />
        <UserBar isHome={isHome} />
      </div>
    </>
  );
}
