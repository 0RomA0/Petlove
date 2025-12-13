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

export default function Filters({ value, onChange }) {
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [sexOpen, setSexOpen] = useState(false);
  const [speciesOpen, setSpeciesOpen] = useState(false);

  const categories = useSelector(selectCategories);
  const selectedCategory = useSelector(selectSelectedCategory);

  const gender = useSelector(selectSex);
  const selectedSex = useSelector(selectSelectedSex);

  const species = useSelector(selectSpecies);
  const selectedSpecies = useSelector(selectSelectedSpecies);

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
      }),
    );
    dispatch(setPage(1));
  };

  const handleClear = () => {
    onChange('');
    dispatch(
      fetchNotices({
        page: 1,
        limit: 6,
        keyword: '',
        category: selectedCategory,
        sex: selectedSex,
        species: selectedSpecies,
      }),
    );
    dispatch(setPage(1));
  };

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchSex());
    dispatch(fetchSpecies());
  }, [dispatch]);

  return (
    <div className={style.container}>
      {/* category */}
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
                  className={item === selectedCategory ? style.active : ''}
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

        {/* species */}

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
      </div>
    </div>
  );
}
