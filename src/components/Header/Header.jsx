import { Link, useLocation } from 'react-router-dom';
import Nav from '../Nav/Nav';
import style from './Header.module.css';
import AuthNav from '../AuthNav/AuthNav';
import UserNav from '../UserNav/UserNav';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectUser } from '../../redux/auth/selectors';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import { useState } from 'react';
import UserBar from '../UserBar/UserBar';

export default function Header({ className }) {
  const [openBurgerMenu, setOpenBurgerMenu] = useState(false);

  const { pathname } = useLocation();
  const isHome = pathname === '/home';

  const isLogin = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  return (
    <>
      <header>
        <div
          className={`${
            isHome ? style.container : style.defaultContainer
          } ${className}`}
        >
          <div className={style.logoNavWrapper}>
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
          </div>
          <div className={style.menuWrapper}>
            <div className={style.authWrapper}>
              {isLogin ? (
                <UserNav isHome={isHome} />
              ) : (
                <AuthNav isHome={isHome} className={style.rowAuth} />
              )}
            </div>

            {isLogin && (
              <div className={style.mobileUser}>
                <UserBar isHome={isHome} userName={user.name} />
              </div>
            )}

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
        </div>
      </header>

      <BurgerMenu
        isOpen={openBurgerMenu}
        onClose={() => setOpenBurgerMenu(false)}
      />
    </>
  );
}
