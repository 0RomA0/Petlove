import style from './NewsList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews } from '../../redux/news/operations';
import { useEffect } from 'react';
import {
  selectIsLoading,
  selectNews,
  selectPage,
  selectTotalPages,
} from '../../redux/news/selectors';
import NewsItem from '../NewsItem/NewsItem';
import Pagination from '../Pagination/Pagination';
import Title from '../Title/Title';

export default function NewsList() {
  const dispatch = useDispatch();
  const news = useSelector(selectNews);
  const isLoading = useSelector(selectIsLoading);
  const page = useSelector(selectPage);
  const totalPages = useSelector(selectTotalPages);

  // console.log(news);
  useEffect(() => {
    dispatch(fetchNews({ page, limit: 6 }));
  }, [dispatch, page]);

  const handlePageChange = (newPage) => {
    dispatch(fetchNews({ page: newPage, limit: 6 }));
  };

  if (!isLoading && news.length === 0) {
    return <p> No data </p>;
  }

  return (
    <>
      <div className={style.container}>
        <Title text={'News'} />
        <ul className={style.list}>
          {news.map((item) => (
            <li className={style.item} key={item._id}>
              <NewsItem
                newsText={item.text}
                newsTitle={item.title}
                newsDate={item.date}
                newsPhoto={item.imgUrl}
                // newsId={item.id}
                newsUrl={item.url}
              />
            </li>
          ))}
        </ul>

        <Pagination
          page={page}
          totalPages={totalPages}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
}
