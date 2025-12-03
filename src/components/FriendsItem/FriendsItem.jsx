import { formatWorkTime } from '../../utils/formatWorkTime';
import style from './FriendsItem.module.css';

export default function FriendsItem({
  friendsTitle,
  friendsPhoto,
  friendsEmail,
  friendsAddress,
  friendsPhone,
  Friendswork,
}) {
  return (
    <>
      <div className={style.container}>
        <p className={style.workTime}> {formatWorkTime(Friendswork)} </p>
        <div className={style.InfoContainer}>
          <img
            className={style.friendImg}
            src={friendsPhoto}
            alt={friendsTitle}
          />
          <div className={style.contentContainet}>
            <div className={style.textContent}>
              <h2 className={style.title}> {friendsTitle} </h2>
              <p className={style.friendsInfo}>
                Email:
                <span className={style.info}>
                  {friendsEmail || 'website only'}
                </span>
              </p>
              <p className={style.friendsInfo}>
                Address:
                <span className={style.info}>
                  {friendsAddress || 'website only'}
                </span>
              </p>
              <p className={style.friendsInfo}>
                Phone:
                <span className={style.info}>
                  {friendsPhone || 'website only'}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
