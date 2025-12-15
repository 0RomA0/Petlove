import style from './App.module.css';
import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { selectRefreshing } from '../../redux/auth/selectors';
import { refreshUser } from '../../redux/auth/operations';
import { Toaster } from 'react-hot-toast';

const MainPage = lazy(() => import('../../pages/MainPage/MainPage'));
const MainLayout = lazy(() => import('../MainLayout/MainLayout'));
const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const NewsPage = lazy(() => import('../../pages/NewsPage/NewsPage'));
const OurFriendsPage = lazy(() =>
  import('../../pages/OurFriendsPage/OurFriendsPage'),
);
const RegistrationPage = lazy(() =>
  import('../../pages/RegistrationPage/RegistrationPage'),
);
const LoginPage = lazy(() => import('../../pages/LoginPage/LoginPage'));
const NoticesPage = lazy(() => import('../../pages/NoticesPage/NoticesPage'));
const NotFoundPage = lazy(() =>
  import('../../pages/NotFoundPage/NotFoundPage'),
);
const AddPetPage = lazy(() => import('../../pages/AddPetPage/AddPetPage'));
const ProfilePage = lazy(() => import('../../pages/ProfilePage/ProfilePage'));

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <p className={style.refreshingText}> Refreshing user... </p>
  ) : (
    <div className={style.container}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route
          path="home"
          element={
            <Suspense fallback={<Loader />}>
              <HomePage />
            </Suspense>
          }
        />

        <Route
          element={
            <Suspense fallback={<Loader />}>
              <MainLayout />
            </Suspense>
          }
        >
          <Route path="/news" element={<NewsPage />} />
          <Route path="/friends" element={<OurFriendsPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/notices" element={<NoticesPage />} />
          <Route path="/add-pet" element={<AddPetPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default App;
