import style from './NoticesPage.module.css';
import NotiscesList from '../../components/NoticesList/NoticesList';
import Title from '../../components/Title/Title';
import Filters from '../../components/Filters/Filters';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchNotices } from '../../redux/notices/operations';
import {
  selectNotices,
  selectIsLoading,
  selectNoticesTotalPages,
  selectNoticesPage,
} from '../../redux/notices/selectors';
import Pagination from '../../components/Pagination/Pagination';
import {
  selectSelectedCategory,
  selectSelectedSex,
  selectSelectedSpecies,
} from '../../redux/filters/selectors';

export default function NoticesPage() {
  const [text, setText] = useState('');

  const dispatch = useDispatch();
  const notices = useSelector(selectNotices);
  const isLoading = useSelector(selectIsLoading);
  const page = useSelector(selectNoticesPage);
  const totalPages = useSelector(selectNoticesTotalPages);

  const selectedCategory = useSelector(selectSelectedCategory);
  const selectedSex = useSelector(selectSelectedSex);
  const selectedSpecies = useSelector(selectSelectedSpecies);

  useEffect(() => {
    dispatch(
      fetchNotices({
        page,
        limit: 6,
        keyword: '',
        category: selectedCategory,
        sex: selectedSex,
        species: selectedSpecies,
      }),
    );
  }, [dispatch, selectedCategory, selectedSex, selectedSpecies]);

  const handlePageChange = (newPage) => {
    dispatch(
      fetchNotices({
        page: newPage,
        limit: 6,
        keyword: text,
        category: selectedCategory,
        sex: selectedSex,
        species: selectedSpecies,
      }),
    );
  };

  if (!isLoading && notices.length === 0) {
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
      <div className={style.contentContainer}>
        <Title className={style.textNotices} text={'Find your favorite pet'} />
        <div className={style.filters}>
          <Filters value={text} onChange={setText} />
        </div>
      </div>

      <NotiscesList notices={notices} />

      <Pagination
        page={page}
        totalPages={totalPages}
        onChange={handlePageChange}
      />
    </>
  );
}
