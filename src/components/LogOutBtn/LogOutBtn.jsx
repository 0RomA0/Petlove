import { useDispatch } from 'react-redux';
import style from './LogOutBtn.module.css';
import { logOutUser } from '../../redux/auth/operations';

export default function LogOutBtn({ isHome }) {
  const dispatch = useDispatch();

  return (
    <>
      <div className={isHome ? style.containerHome : style.container}>
        <button
          className={isHome ? style.btnLogOutHome : style.btnLogOut}
          type="button"
          onClick={() => dispatch(logOutUser())}
        >
          Log out
        </button>
      </div>
    </>
  );
}
