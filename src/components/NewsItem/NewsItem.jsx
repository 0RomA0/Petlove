import { formatDate } from '../../utils/formatDate';
import style from './NewsItem.module.css';

export default function NewsItem({
  newsText,
  newsTitle,
  newsDate,
  newsPhoto,
  //   newsId,
  newsUrl,
}) {
  return (
    <>
      <div className={style.container}>
        <img className={style.newsImg} src={newsPhoto} alt={newsTitle} />
        <div className={style.contentContainet}>
          <div className={style.textContent}>
            <h2 className={style.title}> {newsTitle} </h2>
            <p className={style.text}> {newsText} </p>
          </div>
          <div className={style.content}>
            <p className={style.date}> {formatDate(newsDate)} </p>
            <a className={style.newsLink} href={newsUrl} target="_blank">
              Read more
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
