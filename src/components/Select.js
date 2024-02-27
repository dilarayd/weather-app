import { useEffect } from 'react'
import { fetchCityList, selectCityList, setCity } from '../redux/WeatherSlice'
import { useDispatch, useSelector } from 'react-redux'

function Select() {
  const dispatch = useDispatch();
  const cityList = useSelector(selectCityList);
  useEffect(() => {
    dispatch(fetchCityList());
  }, [dispatch]);

  const handleCityChange = (e) => {
    dispatch(setCity(e.target.value));
  };


  return (
    <div>
      <select id="city" onChange={handleCityChange} >
        <option value="İstanbul">Şehir seçiniz</option>
        {cityList.map((city, index) => (
          <option key={index} value={city.name}>
            {city.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select