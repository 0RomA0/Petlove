import { useEffect } from 'react';
import style from './ModalLogOut.module.css';

export default function ModalLogOut({ isOpen, onClose, onConfirm }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

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
              srcSet="../../../cat-1x.png, ../../../cat-2x.png"
              src="../../../cat-1x.png"
              alt="cat"
            />
          </div>
          <div className={style.contentContainer}>
            <h3 className={style.title}>Already leaving?</h3>
            <div className={style.btnContainer}>
              <button className={style.btnYes} onClick={onConfirm}>
                Yes
              </button>
              <button className={style.btnCancel} onClick={onClose}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
