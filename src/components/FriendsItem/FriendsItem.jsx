import { formatWorkTime } from '../../utils/formatWorkTime';
import style from './FriendsItem.module.css';

export default function FriendsItem({
  friendsTitle,
  friendsPhoto,
  friendsEmail,
  friendsAddress,
  friendsPhone,
  Friendswork,
  FriendsUrl,
  FriendsAddressUrl,
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
                <a href={FriendsUrl} target="_blank" className={style.info}>
                  {friendsEmail || 'website only'}
                </a>
              </p>
              <p className={style.friendsInfo}>
                Address:
                <a
                  href={friendsAddress ? FriendsAddressUrl : FriendsUrl}
                  target="_blank"
                  className={style.info}
                >
                  {friendsAddress || 'website only'}
                </a>
              </p>
              <p className={style.friendsInfo}>
                Phone:
                <a href={FriendsUrl} target="_blank" className={style.info}>
                  {friendsPhone || 'website only'}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
