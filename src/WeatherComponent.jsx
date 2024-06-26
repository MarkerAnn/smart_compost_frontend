import { useEffect, useState } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'

const WeatherComponent = () => {
  const [weather, setWeather] = useState({
    description: '',
    icon: '',
    temp: 0,
  })

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          'https://api.openweathermap.org/data/2.5/weather',
          {
            params: {
              q: 'Trolmen,SE',
              units: 'metric',
              appid: import.meta.env.VITE_API_OPENWEATHERMAP_KEY, // Ersätt 'YOUR_API_KEY' med din faktiska API-nyckel
            },
          }
        )
        const { weather, main } = response.data
        setWeather({
          description: weather[0].description,
          icon: `http://openweathermap.org/img/wn/${weather[0].icon}.png`,
          temp: main.temp,
        })
      } catch (error) {
        console.error('Error fetching weather data:', error)
      }
    }

    fetchWeather()
  }, [])

  return (
    <div className='flex flex-col items-center justify-between p-4 bg-violet-500 rounded-lg shadow-lg w-48 h-48'>
      <h2 className='text-sm text-purple-200 mb-1'>Väder i Trolmen</h2>
      <img src={weather.icon} alt='Weather Icon' className='mx-auto my-2' />
      <p className='text-2xl font-bold text-white mb-1'>{`${weather.temp.toFixed(
        1
      )}°C`}</p>
      <p className='text-xs text-white mb-1'>{weather.description}</p>
    </div>
  )
}

WeatherComponent.propTypes = {
  temp: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
}

export default WeatherComponent
