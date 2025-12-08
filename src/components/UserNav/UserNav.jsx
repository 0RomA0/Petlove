import { useSelector } from 'react-redux';
import LogOutBtn from '../LogOutBtn/LogOutBtn';
import UserBar from '../UserBar/UserBar';
import style from './UserNav.module.css';
import { selectUser } from '../../redux/auth/selectors';

export default function UserNav({ isHome }) {
  const user = useSelector(selectUser);

  return (
    <>
      <div className={style.container}>
        <LogOutBtn isHome={isHome} />
        <UserBar isHome={isHome} userName={user.name} />
      </div>
    </>
  );
}
