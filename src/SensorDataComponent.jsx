import { useEffect, useState } from 'react'
import axios from 'axios'

const SensorDataComponent = () => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Replace with your actual API URL
    const apiUrl =
      'https://hvo513j6e1.execute-api.eu-north-1.amazonaws.com/dev/sensor-data'

    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        setData(response.data)
      } catch (err) {
        setError(err.message)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      <h1>Sensor Data</h1>
      {error && <p>Error: {error}</p>}
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  )
}

export default SensorDataComponent
