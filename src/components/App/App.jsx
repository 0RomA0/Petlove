import style from './App.module.css';
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Loader from '../Loader/Loader';

const MainPage = lazy(() => import('../../pages/MainPage/MainPage'));
const MainLayout = lazy(() => import('../MainLayout/MainLayout'));
const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const NewsPage = lazy(() => import('../../pages/NewsPage/NewsPage'));
const RegistrationPage = lazy(() =>
  import('../../pages/RegistrationPage/RegistrationPage'),
);
const LoginPage = lazy(() => import('../../pages/LoginPage/LoginPage'));

function App() {
  return (
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
          {/* <Route path="home" element={<HomePage />} /> */}
          <Route path="/news" element={<NewsPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* <Route path="/notices" element={<NoticesPage />} />
          <Route path="/friends" element={<OurFriendsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/add-pet" element={<AddPetPage />} />
          <Route path="*" element={<NotFoundPage />} /> */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
