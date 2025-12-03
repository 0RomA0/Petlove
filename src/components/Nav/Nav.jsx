import style from './Nav.module.css';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

export default function Nav({ isHome }) {
  const NavLinkActiveClass = ({ isActive }) =>
    clsx(
      isHome ? style.linkHome : style.linkBase,
      isActive && isHome ? style.activeHome : style.activeBase,
    );

  return (
    <div className={style.container}>
      <nav className={style.nav}>
        <NavLink to="/news" className={NavLinkActiveClass}>
          News
        </NavLink>
        <NavLink to="/notices" className={NavLinkActiveClass}>
          Find pet
        </NavLink>
        <NavLink to="/friends" className={NavLinkActiveClass}>
          Our friends
        </NavLink>

        {/* <NavLink to="/favorites" className={NavLinkActiveClass}>
          Favorites
        </NavLink> */}
      </nav>
    </div>
  );
}
