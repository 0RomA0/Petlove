import { useState, useEffect } from 'react';
import style from './Filters.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCategories,
  selectSelectedCategory,
  selectSelectedSex,
  selectSelectedSpecies,
  selectSex,
  selectSpecies,
} from '../../redux/filters/selectors';
import {
  fetchCategories,
  fetchSex,
  fetchSpecies,
} from '../../redux/filters/operations';
import { setCategory, setGender, setSpecies } from '../../redux/filters/slice';
import SearchField from '../SearchField/SearchField';
import { setPage } from '../../redux/notices/slice';
import { fetchNotices } from '../../redux/notices/operations';
import SearchFileLocation from '../SearchFileLocation/SearchFileLocation';
import { selectSelectedCity } from '../../redux/cities/selectors';
import { setCity, clearCity } from '../../redux/cities/slice';

export default function Filters({ value, onChange }) {
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [sexOpen, setSexOpen] = useState(false);
  const [speciesOpen, setSpeciesOpen] = useState(false);
  const [sortParams, setSortParams] = useState({
    byPrice: false,
    byPopularity: false,
  });

  const categories = useSelector(selectCategories);
  const selectedCategory = useSelector(selectSelectedCategory);

  const gender = useSelector(selectSex);
  const selectedSex = useSelector(selectSelectedSex);

  const species = useSelector(selectSpecies);
  const selectedSpecies = useSelector(selectSelectedSpecies);

  const selectedCity = useSelector(selectSelectedCity);

  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(
      fetchNotices({
        page: 1,
        limit: 6,
        keyword: value,
        category: selectedCategory,
        sex: selectedSex,
        species: selectedSpecies,
        locationId: selectedCity?._id || '',
        ...sortParams,
      }),
    );
    dispatch(setPage(1));
  };

  const handleClear = () => {
    onChange('');
    dispatch(clearCity());
    dispatch(setCategory(''));
    dispatch(setGender(''));
    dispatch(setSpecies(''));
    dispatch(setPage(1));
  };

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchSex());
    dispatch(fetchSpecies());
  }, [dispatch]);

  const handleSortChange = (type) => {
    const newSort = { byPrice: false, byPopularity: false };
    if (type) newSort[type] = true;
    setSortParams(newSort);

    dispatch(
      fetchNotices({
        page: 1,
        limit: 6,
        keyword: value,
        category: selectedCategory,
        sex: selectedSex,
        species: selectedSpecies,
        locationId: selectedCity?._id || '',
        ...newSort,
      }),
    );
    dispatch(setPage(1));
  };

  const handleClearSort = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const clearedSort = { byPrice: false, byPopularity: false };
    setSortParams(clearedSort);

    dispatch(
      fetchNotices({
        page: 1,
        limit: 6,
        keyword: value,
        category: selectedCategory,
        sex: selectedSex,
        species: selectedSpecies,
        locationId: selectedCity?._id || '',
        ...clearedSort,
      }),
    );
    dispatch(setPage(1));
  };

  return (
    <div className={style.container}>
      <div className={style.filterContainer}>
        <SearchField
          value={value}
          onChange={onChange}
          onClear={handleClear}
          onSearch={handleSearch}
        />

        <div className={style.selectWrapper}>
          <div
            className={style.selectHeader}
            onClick={() => setCategoryOpen(!categoryOpen)}
          >
            {selectedCategory || 'Category'}
            <svg className={style.icon}>
              <use
                href={`/sprite.svg#${
                  categoryOpen ? 'icon-chevron-up' : 'icon-chevron-down'
                }`}
              />
            </svg>
          </div>

          {categoryOpen && (
            <ul className={style.selectList}>
              {categories.map((item) => (
                <li
                  key={item}
                  className={item === selectedCategory ? style.active : ''}
                  onClick={() => {
                    dispatch(setCategory(item));
                    setCategoryOpen(false);
                  }}
                >
                  {item}
                </li>
              ))}
              <li
                className={style.clearItem}
                onClick={() => {
                  dispatch(setCategory(''));
                  setCategoryOpen(false);
                }}
              >
                Clear
              </li>
            </ul>
          )}
        </div>

        {/* Sex */}
        <div className={style.selectWrapper}>
          <div
            className={style.selectHeader}
            onClick={() => setSexOpen(!sexOpen)}
          >
            {selectedSex || 'By gender'}
            <svg className={style.icon}>
              <use
                href={`/sprite.svg#${
                  sexOpen ? 'icon-chevron-up' : 'icon-chevron-down'
                }`}
              />
            </svg>
          </div>

          {sexOpen && (
            <ul className={style.selectList}>
              {gender.map((item) => (
                <li
                  key={item}
                  className={item === selectedSex ? style.active : ''}
                  onClick={() => {
                    dispatch(setGender(item));
                    setSexOpen(false);
                  }}
                >
                  {item}
                </li>
              ))}
              <li
                className={style.clearItem}
                onClick={() => {
                  dispatch(setGender(''));
                  setSexOpen(false);
                }}
              >
                Clear
              </li>
            </ul>
          )}
        </div>

        {/* Species */}
        <div className={style.selectWrapper}>
          <div
            className={style.selectHeader}
            onClick={() => setSpeciesOpen(!speciesOpen)}
          >
            {selectedSpecies || 'By type'}
            <svg className={style.icon}>
              <use
                href={`/sprite.svg#${
                  speciesOpen ? 'icon-chevron-up' : 'icon-chevron-down'
                }`}
              />
            </svg>
          </div>

          {speciesOpen && (
            <ul className={style.selectList}>
              {species.map((item) => (
                <li
                  key={item}
                  className={item === selectedSpecies ? style.active : ''}
                  onClick={() => {
                    dispatch(setSpecies(item));
                    setSpeciesOpen(false);
                  }}
                >
                  {item}
                </li>
              ))}
              <li
                className={style.clearItem}
                onClick={() => {
                  dispatch(setSpecies(''));
                  setSpeciesOpen(false);
                }}
              >
                Clear
              </li>
            </ul>
          )}
        </div>

        {/* Search by city */}
        <SearchFileLocation
          value={selectedCity}
          onChange={(city) => {
            dispatch(setCity(city));
            dispatch(setPage(1));
          }}
        />
      </div>

      <div className={style.stickWrapper}>
        <div className={style.stick}></div>
      </div>

      <div className={style.radioBtnWrapper}>
        <label className={style.radioLabel}>
          <input
            type="radio"
            name="sort"
            value="popular"
            className={style.radio}
          />
          Popular
          <button
            type="button"
            className={style.closeBtn}
            onClick={handleClearSort}
          >
            <svg className={style.closeIcon}>
              <use href="/sprite.svg#icon-cross-small" />
            </svg>
          </button>
        </label>

        <label className={style.radioLabel}>
          <input
            type="radio"
            name="sort"
            value="unpopular"
            className={style.radio}
            checked={sortParams.byPopularity}
            onChange={() => handleSortChange('byPopularity')}
          />
          Unpopular
          {sortParams.byPopularity && (
            <button
              type="button"
              className={style.closeBtn}
              onClick={handleClearSort}
            >
              <svg className={style.closeIcon}>
                <use href="/sprite.svg#icon-cross-small" />
              </svg>
            </button>
          )}
        </label>

        <label className={style.radioLabel}>
          <input
            type="radio"
            name="sort"
            value="cheap"
            className={style.radio}
            checked={sortParams.byPrice}
            onChange={() => handleSortChange('byPrice')}
          />
          Cheap
          {sortParams.byPrice && (
            <button
              type="button"
              className={style.closeBtn}
              onClick={handleClearSort}
            >
              <svg className={style.closeIcon}>
                <use href="/sprite.svg#icon-cross-small" />
              </svg>
            </button>
          )}
        </label>

        <label className={style.radioLabel}>
          <input
            type="radio"
            name="sort"
            value="expensive"
            className={style.radio}
          />
          Expensive
          <button
            type="button"
            className={style.closeBtn}
            onClick={handleClearSort}
          >
            <svg className={style.closeIcon}>
              <use href="/sprite.svg#icon-cross-small" />
            </svg>
          </button>
        </label>
      </div>
    </div>
  );
}
