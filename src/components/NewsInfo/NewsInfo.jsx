import style from './NewsInfo.module.css';

export default function NewsInfo({
  newsText,
  newsTitle,
  newsDate,
  newsPhoto,
  //   newsId,
  newsUrl,
}) {
  return (
    <>
      <div className={style.news}>
        <div className={style.container}>
          <img className={style.newsImg} src={newsPhoto} alt={newsTitle} />
          <div className={style.textContent}>
            <h2 className={style.title}> {newsTitle} </h2>
            <p className={style.text}> {newsText} </p>
          </div>
          <div className={style.content}>
            <p className={style.date}> {newsDate} </p>
            <button className={style.btn}> {newsUrl} </button>
          </div>
        </div>
      </div>
    </>
  );
}
