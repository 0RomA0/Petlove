import { useState } from 'react';
import { useSelector } from 'react-redux';
import NoticesList from '../NoticesList/NoticesList';
import style from './MyNotices.module.css';
import {
  selectFavoriteNotices,
  selectViewed,
} from '../../redux/auth/selectors';

export default function MyNotices() {
  const [activeTab, setActiveTab] = useState('favorites');

  const favorites = useSelector(selectFavoriteNotices);
  const viewed = useSelector(selectViewed);

  const notices = activeTab === 'viewed' ? viewed : favorites;

  return (
    <div className={style.wrapper}>
      <div className={style.btnContainer}>
        <button
          className={`${style.btnFavorites} ${
            activeTab === 'favorites' ? style.isActiveBtn : style.baseBtn
          }`}
          onClick={() => setActiveTab('favorites')}
        >
          My favorite pets
        </button>

        <button
          className={`${style.btnViewed} ${
            activeTab === 'viewed' ? style.isActiveBtn : style.baseBtn
          }`}
          onClick={() => setActiveTab('viewed')}
        >
          Viewed
        </button>
      </div>

      {notices.length === 0 ? (
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
      ) : (
        <div className={style.container}>
          <NoticesList notices={notices} type={activeTab} />
        </div>
      )}
    </div>
  );
}
