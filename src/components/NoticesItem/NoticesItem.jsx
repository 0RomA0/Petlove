import style from './NoticesItem.module.css';

export default function NoticesItem({
  noticesPhoto,
  noticesTitle,
  noticesName,
  noticesBirthday,
  noticesSex,
  noticesSpecies,
  noticesCategory,
  noticesReating,
  noticesText,
  noticesPrice,
}) {
  return (
    <>
      <div className={style.container}>
        <img
          className={style.noticesImg}
          src={noticesPhoto}
          alt={noticesTitle}
        />
        <div className={style.contentContainet}>
          <div className={style.textContent}>
            <h2 className={style.title}> {noticesTitle} </h2>
            <div className={style.reating}>
              <svg className={style.starIcon}>
                <use href="/sprite.svg#icon-star" />
              </svg>
              <p className={style.reatingNumb}> {noticesReating} </p>
            </div>
          </div>
          <div className={style.content}>
            <p className={style.info}>
              Name <span className={style.infoText}> {noticesName} </span>
            </p>
            <p className={style.info}>
              Birthday
              <span className={style.infoText}> {noticesBirthday} </span>
            </p>
            <p className={style.info}>
              Sex <span className={style.infoText}> {noticesSex} </span>
            </p>
            <p className={style.info}>
              Species <span className={style.infoText}>{noticesSpecies}</span>
            </p>
            <p className={style.info}>
              Category
              <span className={style.infoText}> {noticesCategory} </span>
            </p>
          </div>
          <p className={style.text}> {noticesText} </p>

          <div className={style.btnTextContent}>
            <p className={style.price}> ${noticesPrice || 'no price'}</p>
            <div className={style.btnContainer}>
              <button className={style.btn}> Learn more </button>
              <button className={style.btnHeart}>
                <svg className={style.heartIcon}>
                  <use href="/sprite.svg#icon-heart-1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
