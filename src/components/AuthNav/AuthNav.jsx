import { NavLink } from 'react-router-dom';
import style from './AuthNav.module.css';

export default function AuthNav({ isHome }) {
  return (
    <>
      <div className={style.btnContainer}>
        <NavLink
          to="/login"
          className={isHome ? style.btnLogInHome : style.btnLogInBase}
        >
          Log in
        </NavLink>
        <NavLink
          to="/register"
          className={
            isHome ? style.btnRegistrationHome : style.btnRegistrationBase
          }
        >
          Registration
        </NavLink>
      </div>

      {/* <button className={style.btnLogOut} type="button">
        Logout
      </button> */}
    </>
  );
}
