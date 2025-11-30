import style from './Nav.module.css';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

export default function Nav() {
  const NavLinkActiveClass = ({ isActive }) =>
    clsx(style.link, isActive && style.active);

  return (
    <div className={style.container}>
      <nav className={style.nav}>
        <NavLink to="/" className={NavLinkActiveClass}>
          News
        </NavLink>
        <NavLink to="/teachers" className={NavLinkActiveClass}>
          Find pet
        </NavLink>
        <NavLink to="/teachers" className={NavLinkActiveClass}>
          Our friends
        </NavLink>

        {/* <NavLink to="/favorites" className={NavLinkActiveClass}>
          Favorites
        </NavLink> */}
      </nav>
    </div>
  );
}
