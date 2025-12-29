import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { fetchCities } from '../../redux/cities/operations';
import {
  selectCities,
  selectCitiesLoading,
} from '../../redux/cities/selectors';
import style from './SearchFileLocation.module.css';

export default function SearchFileLocation({ value, onChange }) {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');

  const cities = useSelector(selectCities);
  const loading = useSelector(selectCitiesLoading);

  console.log(cities);

  useEffect(() => {
    if (inputValue.length >= 3) {
      dispatch(fetchCities(inputValue));
    }
  }, [inputValue, dispatch]);

  const selectOptions = cities.map((city) => ({
    value: city._id,
    label: `${city.cityEn}, ${city.stateEn}`,
    raw: city,
  }));

  return (
    <div className={style.container}>
      <Select
        className={style.select}
        placeholder="Location"
        value={
          value
            ? {
                value: value._id,
                label: `${value.cityEn}, ${value.stateEn}`,
                raw: value,
              }
            : null
        }
        onChange={(option) => onChange(option ? option.raw : null)}
        inputValue={inputValue}
        onInputChange={setInputValue}
        options={selectOptions}
        isLoading={loading}
        isClearable
      />
    </div>
  );
}
