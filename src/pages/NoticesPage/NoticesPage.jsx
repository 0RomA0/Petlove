import style from './NoticesPage.module.css';
import NoticesList from '../../components/NoticesList/NoticesList';
import Title from '../../components/Title/Title';
import Filters from '../../components/Filters/Filters';
import Pagination from '../../components/Pagination/Pagination';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { fetchNotices } from '../../redux/notices/operations';
import {
  selectNotices,
  selectIsLoading,
  selectNoticesTotalPages,
  selectNoticesPage,
} from '../../redux/notices/selectors';

import {
  selectSelectedCategory,
  selectSelectedSex,
  selectSelectedSpecies,
} from '../../redux/filters/selectors';

import { selectSelectedCity } from '../../redux/cities/selectors';

export default function NoticesPage() {
  const dispatch = useDispatch();

  const [text, setText] = useState('');

  const notices = useSelector(selectNotices);
  const isLoading = useSelector(selectIsLoading);
  const page = useSelector(selectNoticesPage);
  const totalPages = useSelector(selectNoticesTotalPages);

  const selectedCategory = useSelector(selectSelectedCategory);
  const selectedSex = useSelector(selectSelectedSex);
  const selectedSpecies = useSelector(selectSelectedSpecies);
  const selectedCity = useSelector(selectSelectedCity);

  useEffect(() => {
    dispatch(
      fetchNotices({
        page,
        limit: 6,
        keyword: text,
        category: selectedCategory,
        sex: selectedSex,
        species: selectedSpecies,
        locationId: selectedCity?._id || '',
      }),
    );
  }, [
    dispatch,
    page,
    text,
    selectedCategory,
    selectedSex,
    selectedSpecies,
    selectedCity,
  ]);

  const handlePageChange = (newPage) => {
    dispatch(
      fetchNotices({
        page: newPage,
        limit: 6,
        keyword: text,
        category: selectedCategory,
        sex: selectedSex,
        species: selectedSpecies,
        locationId: selectedCity?._id || '',
      }),
    );
  };

  return (
    <>
      <div className={style.contentContainer}>
        <Title className={style.textNotices} text="Find your favorite pet" />
        <div className={style.filters}>
          <Filters value={text} onChange={setText} />
        </div>
      </div>

      {!isLoading && notices.length === 0 ? (
        <div className={style.wrapperError}>
          <p className={style.noDataText}>
            <span className={style.span}>No data.</span>
            <br />
            Please reload the page
          </p>
        </div>
      ) : (
        <NoticesList notices={notices} />
      )}

      {totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onChange={handlePageChange}
        />
      )}
    </>
  );
}
