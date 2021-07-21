import React, { useEffect, useState } from 'react'
import axios from "axios"

function App() {

  const api_key = process.env.REACT_APP_API_KEY

  const [newCountry, setCountry] = useState("")
  const [allCountries, setAllCountries] = useState([])
  const [foundCountries, setFoundCountries] = useState([])

  const handleCountry = (event) => {
    setCountry(event.target.value)
    if (event.target.value !== "") {
      const found = allCountries.filter(c =>
        c.name.toLowerCase().includes(event.target.value.toLowerCase()))
      setFoundCountries(found)
    }else{
      setFoundCountries([])
    }
  }

  const showCountry = (country) => {
    setCountry(country.name)
    setFoundCountries([country])
  }

  useEffect(() => {
    console.log('effect')
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        console.log('promise fulfilled')
        setAllCountries(response.data)
      })
  }, [])

  return (
    <>
      <CountryForm
        handle={handleCountry}
        value={newCountry}/>
      
      <CountryList
        countries={foundCountries}
        showHandle={showCountry}
        api_key={api_key}/>
    </>
  )
}

const CountryForm = (props) => {
  return (
    <div>
      <input
        value={props.value}
        onChange={props.handle}/>
    </div>
  )
}

const CountryList = ({countries, showHandle, api_key}) => {
  if (countries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }

  if (countries.length === 1) {
    return (
      <CountryInfo
        country={countries[0]}
        api_key={api_key}/>
    )
  }
  
  return (
    <div>
      {countries.map(c =>
          <CountryInList
            key={c.name}
            country={c}
            handle={showHandle}/>
      )}
    </div>
  )
}

const CountryInList = ({ country, handle}) => {
  return (
    <p>
      {country.name}
      <button onClick={() => handle(country)}>show</button>
    </p>
  )
}

const CountryInfo = ({country, api_key}) => {
  return (
    <div>
      <h1>{country.name}</h1>
      capital {country.capital}<br/>
      population {country.population}

      <h2>Spoken languages</h2>
      <ul>
        {country.languages.map(l =>
          <li key={l.name}>
            {l.name}
          </li>)}
      </ul>
      <img
        src={country.flag}
        alt="flag"
        style={{height: "100px"}}/>
      
      <h2>Weather in {country.capital}</h2>
      <WeatherInfo
        country={country}
        api_key={api_key}/>
    </div>
  )
}

const WeatherInfo = ({country, api_key}) => {
  const [weather, setWeather] = useState(undefined)
  const [weatherIcon, setWeatherIcon] = useState(undefined)
  useEffect(() => {
    console.log('effect temperature')
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
      .then(response => {
        console.log('promise fulfilled temperature')
        console.log(response.data)
        if (response.data.current !== undefined) {
          setWeather(response.data.current)
          setWeatherIcon(response.data.current.weather_icons[0])
        }
      })
  }, [api_key, country.name])
  if (weather !== undefined) {
    return (
      <p>
        <b>temperature: </b>
        {weather.temperature} Celsius<br />
        <img
          src={weatherIcon}
        alt="weather_icon"
        style={{ height: "64px" }} /><br/>
        <b>wind: </b>
        {weather.wind_speed} mph direction {weather.wind_dir} 

      </p>
    )
  }
  if (api_key === undefined) {
    return (
      <p>api_key is undefined, cannot load data.</p>
    )
  }
  return (
    <p>loading...</p>
  )
}

export default App;
