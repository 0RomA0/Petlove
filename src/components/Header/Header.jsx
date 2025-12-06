import { Link, useLocation } from 'react-router-dom';
import Nav from '../Nav/Nav';
import style from './Header.module.css';
import AuthNav from '../AuthNav/AuthNav';
import UserNav from '../UserNav/UserNav';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

export default function Header() {
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
            <svg width="106" height="28">
              <use
                href={`/sprite.svg#${
                  isHome ? 'icon-logo-home' : 'icon-logo-header'
                }`}
              />
            </svg>
          </Link>

          <Nav isHome={isHome} />

          {isLogin ? <UserNav isHome={isHome} /> : <AuthNav isHome={isHome} />}
        </div>
      </header>
    </>
  );
}
