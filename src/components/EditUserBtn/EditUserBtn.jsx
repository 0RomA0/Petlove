import { useState } from 'react';
import style from './EditUserBtn.module.css';
import ModalEditUser from '../ModalEditUser/ModalEditUser';

export default function EditUserBtn() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleOpen = () => {
    setModalIsOpen(true);
  };

  const handleClose = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <div className={style.btnContainer}>
        <button className={style.btnTrash} onClick={handleOpen}>
          <svg className={style.icon}>
            <use href="/sprite.svg#icon-edit" />
          </svg>
        </button>
      </div>

      {modalIsOpen && (
        <ModalEditUser isOpen={modalIsOpen} onClose={handleClose} />
      )}
    </>
  );
}
