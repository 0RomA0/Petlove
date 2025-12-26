import { Link, useLocation } from 'react-router-dom';
import Nav from '../Nav/Nav';
import style from './Header.module.css';
import AuthNav from '../AuthNav/AuthNav';
import UserNav from '../UserNav/UserNav';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import { useState } from 'react';

export default function Header() {
  const [openBurgerMenu, setOpenBurgerMenu] = useState(false);

  const { pathname } = useLocation();
  const isHome = pathname === '/home';

  const isLogin = useSelector(selectIsLoggedIn);

  return (
    <>
      <header>
        <div className={isHome ? style.container : style.defaultContainer}>
          <Link
            to="/home"
            className={isHome ? style.logoHome : style.logoBlack}
          >
            <svg className={style.icon}>
              <use
                href={`/sprite.svg#${
                  isHome ? 'icon-logo-home' : 'icon-logo-header'
                }`}
              />
            </svg>
          </Link>

          <div className={style.navWrapper}>
            <Nav isHome={isHome} />
          </div>

          <div className={style.authWrapper}>
            {isLogin ? (
              <UserNav isHome={isHome} />
            ) : (
              <AuthNav isHome={isHome} />
            )}
          </div>

          <button
            className={style.burgerBtn}
            onClick={() => setOpenBurgerMenu(true)}
          >
            <svg
              className={isHome ? style.isHomeIconBurger : style.iconBurger}
              width="32"
              height="32"
            >
              <use href="/sprite.svg#icon-burger-menu" />
            </svg>
          </button>
        </div>
      </header>

      <BurgerMenu
        isOpen={openBurgerMenu}
        onClose={() => setOpenBurgerMenu(false)}
      />
    </>
  );
}
