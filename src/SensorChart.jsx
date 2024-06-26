import PropTypes from 'prop-types'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

/**
 * Format the timestamp to a "dd/mm" format
 * @param {string} timestamp - The timestamp in the format "dd/mm/yyyy, hh:mm:ss".
 * @returns {string} - The formatted date string.
 */
const formatDate = (timestamp) => {
  // Assume the timestamp is a string in the format "dd/mm/yyyy, hh:mm:ss"
  const parts = timestamp.split(', ') // Split date and time
  const dateParts = parts[0].split('/') // Split date part
  const timeParts = parts[1].split(':') // Split time part

  // Create a new date object from the split parts
  // Note that the month is zero-based in JavaScript (0 = January, 11 = December)
  const date = new Date(
    dateParts[2],
    dateParts[1] - 1,
    dateParts[0],
    timeParts[0],
    timeParts[1],
    timeParts[2]
  )

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    console.error('Invalid date:', timestamp)
    return 'Invalid date'
  }

  // Return the date in the format "day/month" (e.g., 21/6)
  return `${date.getDate()}/${date.getMonth() + 1}`
}

/**
 * ********************** SensorChart - Component to display sensor data in an area chart **********************
 * @param {Object} props - The properties for the SensorChart component.
 * @param {Array} props.data - The data to be displayed in the chart.
 * @param {string} props.dataKey - The key for the data values to be plotted.
 * @param {string} props.title - The title of the chart.
 * @param {string} props.color - The color of the chart area.
 * @returns {JSX.Element} - The SensorChart component.
 */
const SensorChart = ({ data, dataKey, title, color }) => {
  return (
    <div className='p-4 bg-gray-800 rounded-lg shadow-md'>
      <h2 className='text-white text-lg mb-4'>{title}</h2>
      <ResponsiveContainer width='100%' height={250}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id='colorGradient' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor={color} stopOpacity={0.8} />
              <stop offset='95%' stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray='3 3' stroke='#444' />
          <XAxis dataKey='timestamp' stroke='#ccc' tickFormatter={formatDate} />
          <YAxis stroke='#ccc' />
          <Tooltip labelFormatter={formatDate} />
          <Area
            type='monotone'
            dataKey={dataKey}
            stroke={color}
            fillOpacity={1}
            fill='url(#colorGradient)'
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

SensorChart.propTypes = {
  data: PropTypes.array.isRequired,
  dataKey: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
}

export default SensorChart
