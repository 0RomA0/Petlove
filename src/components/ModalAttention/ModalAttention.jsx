import style from './ModalAttention.module.css';
import { NavLink } from 'react-router-dom';
import { useModalEffects } from '../../utils/useModalEffects';

export default function ModalAttention({ isOpen, onClose }) {
  useModalEffects(isOpen, onClose);

  if (!isOpen) return null;

  return (
    <div className={style.modalOverlay} onClick={onClose}>
      <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={style.closeBtn} onClick={onClose}>
          <svg className={style.closeIcon}>
            <use href="/sprite.svg#icon-cross-small" />
          </svg>
        </button>

        <div className={style.divWrapper}>
          <div className={style.imgWrapper}>
            <img
              className={style.smallImgCat}
              srcSet="../../../dog-1x.png, ../../../dog-2x.png"
              src="../../../dog-1x.png"
              alt="dog"
            />
          </div>
          <div className={style.contentContainer}>
            <div className={style.textContainer}>
              <h3 className={style.title}>Attention</h3>
              <p className={style.text}>
                We would like to remind you that certain functionality is
                available only to authorized users.If you have an <br />
                account, please log in with your credentials. If you do <br />
                not already have an account, you must register to <br />
                access these features.
              </p>
            </div>

            <div className={style.btnContainer}>
              <NavLink to="/login" className={style.loginBtn} onClick={onClose}>
                Log In
              </NavLink>
              <NavLink
                to="/register"
                className={style.resistrBtn}
                onClick={onClose}
              >
                Registration
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
