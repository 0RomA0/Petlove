import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import style from './UserInfoForm.module.css';

export default function UserInfoForm() {
  const user = useSelector(selectUser);

  if (!user) return null;

  return (
    <>
      <div className={style.iconPhotoWrapper}>
        <div className={style.wrapperUser}>
          <p className={style.textUser}>User</p>
          <svg className={style.iconUser}>
            <use href="/sprite.svg#icon-user02" />
          </svg>
        </div>

        {user.avatar ? (
          <img src={user.avatar} className={style.previewImg} />
        ) : (
          <div className={style.svgWrapperUserAvatar}>
            <svg className={style.iconAvatar}>
              <use href="/sprite.svg#icon-user" />
            </svg>
          </div>
        )}
      </div>

      <h3 className={style.title}>My information</h3>

      <div className={style.infoWrapper}>
        <p className={`${style.text} ${user.name ? style.textFilled : ''}`}>
          {user.name || '—'}
        </p>
        <p className={`${style.text} ${user.email ? style.textFilled : ''}`}>
          {user.email || '—'}
        </p>
        <p className={`${style.text} ${user.phone ? style.textFilled : ''}`}>
          {user.phone || '—'}
        </p>
      </div>
    </>
  );
}
