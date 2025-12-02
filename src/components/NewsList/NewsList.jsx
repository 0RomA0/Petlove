import style from './NewsList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews } from '../../redux/news/operations';
import { useEffect } from 'react';
import { selectIsLoading, selectNews } from '../../redux/news/selectors';
import NewsInfo from '../../components/NewsInfo/NewsInfo';

export default function NewsList() {
  const dispatch = useDispatch();
  const news = useSelector(selectNews);
  const isLoading = useSelector(selectIsLoading);

  console.log(news);

  // console.log(news);
  useEffect(() => {
    dispatch(fetchNews({ page: 1, limit: 6 }));
  }, [dispatch]);

  if (!isLoading && news.length === 0) {
    return <p> No data </p>;
  }

  return (
    <>
      <div className={style.container}>
        <h2> News </h2>
        <ul className={style.list}>
          {news.map((item) => (
            <li className={style.item} key={item._id}>
              <NewsInfo
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
      </div>
    </>
  );
}
