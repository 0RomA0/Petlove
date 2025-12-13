import style from './NewsList.module.css';

import NewsItem from '../NewsItem/NewsItem';

export default function NewsList({ news }) {
  return (
    <>
      <div className={style.container}>
        <ul className={style.list}>
          {news.map((item) => (
            <li className={style.item} key={item._id}>
              <NewsItem
                newsText={item.text}
                newsTitle={item.title}
                newsDate={item.date}
                newsPhoto={item.imgUrl}
                // newsId={item.id}
                newsUrl={item.url}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
