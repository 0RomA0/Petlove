import { Link } from 'react-router-dom';
import Nav from '../../Nav/Nav';
import style from './Header.module.css';
import AuthNav from '../../AuthNav/AuthNav';

export default function Header() {
  return (
    <>
      <header>
        <div className={style.container}>
          <Link to="/" className={style.logo}>
            <svg width="106" height="28">
              <use href="/sprite.svg#icon-logo-home" />
            </svg>
          </Link>

          <Nav />

          <AuthNav />
        </div>
      </header>
    </>
  );
}
