import style from './MainLayout.module.css';
import { Outlet } from 'react-router-dom';
import Header from '../App/Header/Header';

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
