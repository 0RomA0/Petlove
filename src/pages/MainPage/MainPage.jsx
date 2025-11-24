import { NavLink } from 'react-router-dom';
import style from './MainPage.module.css';

export default function MainPage() {
  return (
    <div className={style.container}>
      <NavLink to={'/home'} className={style.btn}>
        <svg>
          <use href="/sprite.svg#icon-logo-main" />
        </svg>
      </NavLink>
    </div>
  );
}
