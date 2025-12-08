import style from './UserBar.module.css';

export default function UserBar({ isHome, userName }) {
  return (
    <>
      <div className={style.container}>
        <div className={style.svgwrapper}>
          <svg className={style.userIcon}>
            <use href="/sprite.svg#icon-user" />
          </svg>
        </div>
        <p className={isHome ? style.textHome : style.text}>{userName}</p>
      </div>
    </>
  );
}
