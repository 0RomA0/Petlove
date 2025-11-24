import { Outlet } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';

export default function MainLayout() {
  return (
    <>
      {/* <Header /> */}
      {/* <Loader /> */}
      <Outlet />
    </>
  );
}
