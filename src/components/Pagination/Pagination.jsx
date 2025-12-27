// Pagination.jsx
import { useEffect, useState } from 'react';
import style from './Pagination.module.css';

export default function Pagination({ page, totalPages, onChange }) {
  const [visibleCount, setVisibleCount] = useState(3);

  // Адаптація під ширину екрану
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(2); // мобільні екрани 320–375
      } else {
        setVisibleCount(3); // планшети і десктоп
      }
    };

    handleResize(); // одразу при рендері
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const start = Math.max(1, page);
  const end = Math.min(totalPages, start + visibleCount - 1);

  const pagesToShow = [];
  for (let i = start; i <= end; i++) {
    pagesToShow.push(i);
  }
  if (end < totalPages) {
    pagesToShow.push('...');
  }

  return (
    <div className={style.container}>
      <div className={style.iconContainer}>
        <button
          className={style.paginationBtn}
          onClick={() => onChange(1)}
          disabled={page === 1}
        >
          <div className={style.doubleIcon}>
            <svg
              className={page === 1 ? style.iconNoActive : style.iconActive}
              width="24"
              height="24"
            >
              <use href="/sprite.svg#icon-pagination-left" />
            </svg>
            <svg
              className={page === 1 ? style.iconNoActive : style.iconActive}
              width="24"
              height="24"
            >
              <use href="/sprite.svg#icon-pagination-left" />
            </svg>
          </div>
        </button>

        <button
          className={style.paginationBtn}
          onClick={() => onChange(page - 1)}
          disabled={page === 1}
        >
          <svg
            className={page === 1 ? style.iconNoActive : style.iconActive}
            width="24"
            height="24"
          >
            <use href="/sprite.svg#icon-pagination-left" />
          </svg>
        </button>
      </div>

      <div className={style.numberscontainer}>
        {pagesToShow.map((item, index) =>
          item === '...' ? (
            <div
              key={`dots-${index}`}
              className={`${style.number} ${style.numberInactive}`}
            >
              <p className={style.points}>…</p>
            </div>
          ) : (
            <div
              key={item}
              className={`${style.number} ${
                item === page ? style.numberActive : style.numberInactive
              }`}
              onClick={() => onChange(item)}
            >
              <p
                className={`${style.text} ${
                  item === page ? style.textActive : style.textInactive
                }`}
              >
                {item}
              </p>
            </div>
          ),
        )}
      </div>

      <div className={style.iconContainer}>
        <button
          className={style.paginationBtn}
          onClick={() => onChange(page + 1)}
          disabled={page === totalPages}
        >
          <svg
            className={
              page === totalPages ? style.iconNoActive : style.iconActive
            }
            width="24"
            height="24"
          >
            <use href="/sprite.svg#icon-pagination-right" />
          </svg>
        </button>

        <button
          className={style.paginationBtn}
          onClick={() => onChange(totalPages)}
          disabled={page === totalPages}
        >
          <div className={style.doubleIcon}>
            <svg
              className={
                page === totalPages ? style.iconNoActive : style.iconActive
              }
              width="24"
              height="24"
            >
              <use href="/sprite.svg#icon-pagination-right" />
            </svg>
            <svg
              className={
                page === totalPages ? style.iconNoActive : style.iconActive
              }
              width="24"
              height="24"
            >
              <use href="/sprite.svg#icon-pagination-right" />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
}
