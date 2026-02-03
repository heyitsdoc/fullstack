import { useEffect, useState } from 'react'
import axios from 'axios'

const api_key = import.meta.env.VITE_WEATHER_KEY

const Country = ({ country, weather }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital ? country.capital[0] : 'N/A'}</p>
      <p>Area: {country.area} km²</p>
      <h3>Languages:</h3>
      <ul>
        {country.languages && Object.values(country.languages).map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="150" />
      <p>Temperature: {weather.temprature} Celsius</p>
      <img src={`https://openweathermap.org/img/wn/${weather.ico}@2x.png`} alt="weather icon" />
      <p>Wind: {weather.wind} m/s</p>
    </div>
  )
}


function App() {
  const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
  const getWeather = (capital) => {
    const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`)
    return request.then(response => response.data)
  }
  const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [message, setMessage] = useState('')
  const [weather, setWeather] = useState({
    temprature: '',
    wind: '',
    ico: ''
  })
  useEffect(() => {
    setMessage('Loading data...')
    getAll().then(data => {
      setCountries(data)
      setMessage('')
    })
  }, []);
  useEffect(() => {
    if (filteredCountries.length === 1) {
      const capital = filteredCountries[0].capital?.[0]
      if (capital) {
        getWeather(capital).then(weatherData => {
          setWeather({ temprature: weatherData.main.temp, wind: weatherData.wind.speed, ico: weatherData.weather[0].icon })
        })
      }
    }
  }, [filteredCountries])

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase()

    const filtered = countries.filter(country =>
      country.name.common.toLowerCase().includes(searchTerm)
    )
    if (filtered.length > 10) {
      setMessage('Too many matches, specify another filter')
      setFilteredCountries([])
      return
    }

    setMessage('')
    setFilteredCountries(filtered)
  }

  return (
    <>
      <div>find countries <input onChange={handleSearch} /></div>
      {message && <p>{message}</p>}
      {filteredCountries.length === 1 ? <Country weather={weather} country={filteredCountries[0]} /> : filteredCountries.map(country => (
        <div key={country.cca3}>
          {country.name.common} <button onClick={() => setFilteredCountries([country])}>show</button>
        </div>
      ))}

    </>
  )
}

export default App
