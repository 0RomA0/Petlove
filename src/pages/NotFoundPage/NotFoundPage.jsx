import { NavLink } from 'react-router-dom';
import style from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <>
      <div className={style.container}>
        <div className={style.errorWrapper}>
          <p className={style.number}>4</p>
          <div className={style.imgWrapper}>
            <img
              className={style.imgNotFound}
              srcSet="../../../catNotFound-1x.png, ../../../catNotFound-2x.png"
              src="../../../catNotFound-1x.png"
              alt="img"
            />
          </div>
          <p className={style.number}>4</p>
        </div>
        <p className={style.text}>{'Oops! This page not found :('}</p>
        <NavLink className={style.link} to="/home">
          To home page
        </NavLink>
      </div>
    </>
  );
}
