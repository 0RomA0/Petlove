import { useSelector } from 'react-redux';
import style from './UserBar.module.css';
import { selectUser } from '../../redux/auth/selectors';

export default function UserBar({ isHome }) {
  const user = useSelector(selectUser);

  return (
    <>
      <div className={style.container}>
        <div className={style.svgwrapper}>
          <svg className={style.userIcon}>
            <use href="/sprite.svg#icon-user" />
          </svg>
        </div>
        <p className={isHome ? style.textHome : style.text}> {user.name} </p>
      </div>
    </>
  );
}
