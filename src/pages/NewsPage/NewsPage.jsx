// import style from "./NewsPage.module.css"
import { useDispatch } from 'react-redux';
import { fetchNews } from '../../redux/news/operations';
import { useEffect } from 'react';

export default function NewsPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  return (
    <>
      <h1> Hi, I'm NewsPage </h1>
    </>
  );
}
