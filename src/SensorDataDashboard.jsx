import { useEffect, useState } from 'react'
import SensorChart from './SensorChart'
import fetchData from './aws/fetchData'
import LatestReading from './LatestReading'
import WeatherComponent from './WeatherComponent'
import CompostAnalysis from './CompostAnalysis'

const SensorDataDashboard = () => {
  const [allData, setAllData] = useState([])
  const [latestData, setLatestData] = useState({})
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadSensorData = async () => {
      try {
        const response = await fetchData()
        if (response.allItems.length > 0) {
          const sortedData = response.allItems.sort(
            (a, b) => a.timeStamp - b.timeStamp
          )
          setAllData(sortedData)
          setLatestData(response.latestItem)
        } else {
          throw new Error('No data found')
        }
      } catch (error) {
        setError(error.message)
      }
    }

    loadSensorData()
  }, [])

  if (error) {
    return <div className='text-red-500 p-4'>Error: {error}</div>
  }

  if (!allData.length) {
    return <div className='text-soft-purple p-4'>Loading...</div>
  }

  const sensorKeys = [
    'co2',
    'distance',
    'humidity_scd',
    'soil_moisture',
    'soil_temperature',
    'temperature_scd',
  ]

  console.log('Latest data:', latestData)
  return (
    <div className='container mx-auto p-4 space-y-4 text-white bg-custom-gradient'>
      <div className='flex justify-between items-center space-x-4'>
        {' '}
        {/* Flex container */}
        <WeatherComponent />
        <CompostAnalysis latestData={latestData} />
      </div>
      <div className='flex flex-wrap justify-around items-center'>
        {sensorKeys.map((key) => (
          <LatestReading
            key={key}
            label={key}
            value={latestData[key]}
            timestamp={new Date(latestData.timeStamp).toLocaleString()}
          />
        ))}
      </div>
      <div className='grid grid-cols-3 gap-4'>
        {sensorKeys.map((sensorKey) => (
          <div
            key={sensorKey}
            className='p-3 bg-royal-gradient rounded-lg shadow-lg'
          >
            <SensorChart
              data={allData.map((item) => ({
                timestamp: new Date(item.timeStamp).toLocaleString(),
                value: item[sensorKey],
              }))}
              dataKey='value'
              title={`${sensorKey.replace(/_/g, ' ')} Over Time`}
              color={sensorKey === 'temperature_scd' ? '#94208D' : '#6C177F'}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default SensorDataDashboard
