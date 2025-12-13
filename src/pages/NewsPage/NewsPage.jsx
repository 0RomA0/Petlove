import style from './NewsPage.module.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectNews,
  selectPage,
  selectTotalPages,
  selectIsLoading,
} from '../../redux/news/selectors';
import { fetchNews } from '../../redux/news/operations';
import { setPage } from '../../redux/news/slice';
import Title from '../../components/Title/Title';
import SearchField from '../../components/SearchField/SearchField';
import Pagination from '../../components/Pagination/Pagination';
import NewsList from '../../components/NewsList/NewsList';

export default function NewsPage() {
  const dispatch = useDispatch();
  const news = useSelector(selectNews);
  const page = useSelector(selectPage);
  const totalPages = useSelector(selectTotalPages);
  const isLoading = useSelector(selectIsLoading);
  const [text, setText] = useState('');

  useEffect(() => {
    dispatch(fetchNews({ page, limit: 6, keyword: '' }));
  }, [dispatch, page]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(fetchNews({ page: 1, limit: 6, keyword: text }));
    dispatch(setPage(1));
  };

  const handleClear = () => {
    setText('');
    dispatch(fetchNews({ page: 1, limit: 6, keyword: '' }));
    dispatch(setPage(1));
  };

  const handlePageChange = (newPage) => {
    dispatch(fetchNews({ page: newPage, limit: 6, keyword: text }));
  };

  if (!isLoading && news.length === 0) {
    return (
      <div className={style.wrapperError}>
        <p className={style.noDataText}>
          <span className={style.span}>No data.</span> <br /> Pleas reload the
          page
        </p>
      </div>
    );
  }

  return (
    <>
      <div className={style.wrapper}>
        <Title text="News" />
        <SearchField
          value={text}
          onChange={setText}
          onClear={handleClear}
          onSearch={handleSearch}
        />
      </div>
      <NewsList news={news} />
      <Pagination
        page={page}
        totalPages={totalPages}
        onChange={handlePageChange}
      />
    </>
  );
}
