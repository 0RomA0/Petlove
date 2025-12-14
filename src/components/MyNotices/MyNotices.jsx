import { useDispatch, useSelector } from 'react-redux';
import NoticesList from '../NoticesList/NoticesList';
import style from './MyNotices.module.css';
import { useEffect } from 'react';
import {
  selectFavoriteIds,
  selectFavoriteNotices,
} from '../../redux/favorites/selectors';
import { fetchFavoriteNotices } from '../../redux/favorites/operations';

export default function MyNotices() {
  const dispatch = useDispatch();

  const ids = useSelector(selectFavoriteIds);
  const notices = useSelector(selectFavoriteNotices);

  useEffect(() => {
    if (ids.length) {
      dispatch(fetchFavoriteNotices(ids));
    }
  }, [dispatch, ids]);

  if (notices.length === 0) {
    return (
      <div className={style.containerText}>
        <p className={style.text}>
          Oops,
          <span className={style.span}>
            looks like there aren't any furries
          </span>
          on our adorable page yet. Do not worry! View your pets on the "find
          your favorite pet" page and add them to your favorites.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className={style.container}>
        <NoticesList notices={notices} />
      </div>
    </>
  );
}
