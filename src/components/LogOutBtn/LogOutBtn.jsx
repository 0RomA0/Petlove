import { useDispatch } from 'react-redux';
import style from './LogOutBtn.module.css';
import { logOutUser } from '../../redux/auth/operations';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ModalLogOut from '../ModalLogOut/ModalLogOut';
import toast, { Toaster } from 'react-hot-toast';

export default function LogOutBtn({ isHome }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    const res = dispatch(logOutUser());

    if (res.error) {
      toast.error(res.error.message || 'Logout error');
    }
    navigate('/home');
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={isHome ? style.containerHome : style.container}>
        <button
          className={isHome ? style.btnLogOutHome : style.btnLogOut}
          type="button"
          onClick={() => setIsModalOpen(true)}
        >
          Log out
        </button>

        <ModalLogOut
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleLogOut}
        />
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}
