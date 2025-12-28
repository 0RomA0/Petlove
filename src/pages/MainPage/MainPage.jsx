import { NavLink } from 'react-router-dom';
import style from './MainPage.module.css';
import { useState } from 'react';
import Loader from '../../components/Loader/Loader';

export default function MainPage() {
  const [loading, setLoading] = useState(true);

  return (
    <div className={style.container}>
      {loading && <Loader color="#fff" />}

      <NavLink to="/home" className={style.btn}>
        <svg className={style.logoSvg} onLoad={() => setLoading(false)}>
          <use href="/sprite.svg#icon-logo-main" />
        </svg>
      </NavLink>
    </div>
  );
}
