import { NavLink } from 'react-router-dom';
import style from './MainPage.module.css';
import { useEffect, useState } from 'react';
import Loader from '../../components/Loader/Loader';

export default function MainPage() {
  const [loading, setLloading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLloading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={style.container}>
      {loading ? (
        <Loader color="#fff" />
      ) : (
        <NavLink to={'/home'} className={style.btn}>
          <svg className={style.logoSvg}>
            <use href="/sprite.svg#icon-logo-main" />
          </svg>
        </NavLink>
      )}
    </div>
  );
}
