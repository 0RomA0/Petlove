import { useSelector } from 'react-redux';
import NoticesList from '../NoticesList/NoticesList';
import style from './MyNotices.module.css';
import {
  selectFavoriteNotices,
  selectViewed,
} from '../../redux/auth/selectors';

export default function MyNotices({ type }) {
  const favorites = useSelector(selectFavoriteNotices);
  const viewed = useSelector(selectViewed);

  const notices = type === 'viewed' ? viewed : favorites;

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
        <NoticesList notices={notices} type={type} />
      </div>
    </>
  );
}
