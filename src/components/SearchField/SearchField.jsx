import { useState } from 'react';
import style from './SearchField.module.css';
import { useDispatch } from 'react-redux';
import { changeFilter } from '../../redux/filters/slice';
import { setPage } from '../../redux/news/slice';

export default function SearchField() {
  const dispatch = useDispatch();
  const [text, setText] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(changeFilter(text));
  };

  const handleClear = () => {
    setText('');
    dispatch(changeFilter(''));
    dispatch(setPage(1));
  };
  return (
    <form className={style.container} onSubmit={handleSearch}>
      <div className={style.container}>
        <div className={style.inputWrapper}>
          <input
            className={style.input}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Search"
          />
          {text !== '' && (
            <button
              type="button"
              className={style.closeBtn}
              onClick={handleClear}
            >
              <svg className={style.closeIcon}>
                <use href="/sprite.svg#icon-cross-small" />
              </svg>
            </button>
          )}

          <button
            type="button"
            className={style.SearchBtn}
            onClick={handleSearch}
          >
            <svg className={style.icon}>
              <use href="/sprite.svg#icon-search" />
            </svg>
          </button>
        </div>
      </div>
    </form>
  );
}
