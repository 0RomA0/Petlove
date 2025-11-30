import { NavLink } from 'react-router-dom';
import style from './AuthNav.module.css';

export default function AuthNav() {
  return (
    <>
      <div className={style.btnContainer}>
        <NavLink to="/login" className={style.btnLogIn}>
          Log in
        </NavLink>
        <NavLink to="/register" className={style.btnRegistration}>
          Registration
        </NavLink>
      </div>

      {/* <button className={style.btnLogOut} type="button">
        Logout
      </button> */}
    </>
  );
}
