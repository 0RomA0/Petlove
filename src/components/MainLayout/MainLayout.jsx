import Header from '../Header/Header';
import style from './MainLayout.module.css';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <Header />
        <Outlet />
      </div>
    </div>
  );
}
