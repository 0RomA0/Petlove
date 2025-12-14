import { NavLink } from 'react-router-dom';
import style from './UserBar.module.css';

export default function UserBar({ isHome, userName }) {
  return (
    <>
      <div className={style.container}>
        <div className={style.svgwrapper}>
          <svg className={style.userIcon}>
            <use href="/sprite.svg#icon-user" />
          </svg>
        </div>
        <NavLink to="/profile" className={isHome ? style.textHome : style.text}>
          {userName}
        </NavLink>
      </div>
    </>
  );
}
