import style from './NoticesList.module.css';
import NoticesItem from '../NoticesItem/NoticesItem';

export default function NoticesList({ notices }) {
  return (
    <>
      <div className={style.container}>
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
