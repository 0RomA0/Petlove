import style from './SearchField.module.css';

export default function SearchField({ value, onChange, onClear, onSearch }) {
  return (
    <form className={style.container} onSubmit={onSearch}>
      <div className={style.container}>
        <div className={style.inputWrapper}>
          <input
            className={style.input}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search"
          />
          {value !== '' && (
            <button type="button" className={style.closeBtn} onClick={onClear}>
              <svg className={style.closeIcon}>
                <use href="/sprite.svg#icon-cross-small" />
              </svg>
            </button>
          )}

          <button type="button" className={style.SearchBtn} onClick={onSearch}>
            <svg className={style.icon}>
              <use href="/sprite.svg#icon-search" />
            </svg>
          </button>
        </div>
      </div>
    </form>
  );
}
