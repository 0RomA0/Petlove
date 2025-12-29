import Nav from '../Nav/Nav';
import AuthNav from '../AuthNav/AuthNav';
import style from './BurgerMenu.module.css';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import LogOutBtn from '../LogOutBtn/LogOutBtn';

export default function BurgerMenu({ isOpen, onClose }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (!isOpen) return null;

  return (
    <div className={style.overlay} onClick={onClose}>
      <div className={style.menu} onClick={(e) => e.stopPropagation()}>
        <button className={style.closeBtn} onClick={onClose}>
          <svg className={style.closeIcon} width="32" height="32">
            <use href="/sprite.svg#icon-cross-small" />
          </svg>
        </button>
        <Nav />
        <div className={style.wrapperAuth}>
          {isLoggedIn ? <LogOutBtn /> : <AuthNav />}
        </div>
      </div>
    </div>
  );
}
