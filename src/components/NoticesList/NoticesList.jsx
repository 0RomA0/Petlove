import style from './NoticesList.module.css';
import NoticesItem from '../NoticesItem/NoticesItem';
import { useLocation } from 'react-router-dom';

export default function NoticesList({ notices }) {
  const { pathname } = useLocation();
  const isProfilePage = pathname === '/profile';

  return (
    <>
      <div className={style.container}>
        <ul className={isProfilePage ? style.listProfile : style.list}>
          {notices.map((item) => (
            <li
              className={isProfilePage ? style.itemProfile : style.item}
              key={item._id}
            >
              <NoticesItem
                isProfilePage={isProfilePage}
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
                noticesId={item._id}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
