import style from './NoticesList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import NoticesItem from '../NoticesItem/NoticesItem';
import { fetchNotices } from '../../redux/notices/operations';
import { selectNotices, selectIsLoading } from '../../redux/notices/selectors';

export default function NoticesList() {
  const dispatch = useDispatch();
  const notices = useSelector(selectNotices);
  const isLoading = useSelector(selectIsLoading);

  console.log(notices);
  useEffect(() => {
    dispatch(fetchNotices());
  }, [dispatch]);

  if (!isLoading && notices.length === 0) {
    return <p> No data </p>;
  }

  return (
    <>
      <div className={style.container}>
        <h2 className={style.title}> Find your favorite pet </h2>
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
      </div>
    </>
  );
}
