import style from './NoticesList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import NoticesItem from '../NoticesItem/NoticesItem';
import { fetchNotices } from '../../redux/notices/operations';
import {
  selectNotices,
  selectIsLoading,
  selectNoticesTotalPages,
  selectNoticesPage,
} from '../../redux/notices/selectors';
import Pagination from '../Pagination/Pagination';
import Title from '../Title/Title';
import Filters from '../Filters/Filters';

export default function NoticesList() {
  const dispatch = useDispatch();
  const notices = useSelector(selectNotices);
  const isLoading = useSelector(selectIsLoading);
  const page = useSelector(selectNoticesPage);
  const totalPages = useSelector(selectNoticesTotalPages);

  // console.log(notices);
  useEffect(() => {
    dispatch(fetchNotices({ page, limit: 6 }));
  }, [dispatch, page]);

  const handlePageChange = (newPage) => {
    dispatch(fetchNotices({ page: newPage, limit: 6 }));
  };

  if (!isLoading && notices.length === 0) {
    return <p> No data </p>;
  }

  return (
    <>
      <div className={style.container}>
        <Title text={'Find your favorite pet'} />
        <Filters />
        <ul className={style.list}>
          {notices.map((item) => (
            <li className={style.item} key={item._id}>
              <NoticesItem
                noticesPhoto={item.imgURL}
                noticesTitle={item.title}
                noticesName={item.name}
                noticesBirthday={item.birthday}
                noticesSex={item.sex}
                noticesSpecies={item.species}
                noticesCategory={item.category}
                noticesReating={item.popularity}
                noticesText={item.comment}
                noticesPrice={item.price}
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
