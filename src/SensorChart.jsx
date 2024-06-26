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

const formatDate = (timestamp) => {
  // Anta att timestamp är en sträng i formatet "dd/mm/yyyy, hh:mm:ss"
  const parts = timestamp.split(', ') // Delar upp datum och tid
  const dateParts = parts[0].split('/') // Delar upp datumdelen
  const timeParts = parts[1].split(':') // Delar upp tidsdelen

  // Skapar ett nytt datumobjekt från de uppdelade delarna
  // Observera att månaden är nollbaserad i JavaScript (0 = januari, 11 = december)
  const date = new Date(
    dateParts[2],
    dateParts[1] - 1,
    dateParts[0],
    timeParts[0],
    timeParts[1],
    timeParts[2]
  )

  // Kontrollerar för NaN-värden efter felaktig konvertering
  if (isNaN(date.getTime())) {
    console.error('Invalid date:', timestamp)
    return 'Invalid date'
  }

  // Returnerar datumet i formatet "dag/månad" (21/6)
  return `${date.getDate()}/${date.getMonth() + 1}`
}

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

// import PropType from 'prop-types'
// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from 'recharts'

// const SensorChart = ({ data, dataKey, title, color }) => {
//   return (
//     <div className='p-4 bg-gray-800 rounded-lg shadow-md'>
//       <h2 className='text-white text-lg mb-4'>{title}</h2>
//       <ResponsiveContainer width='100%' height={200}>
//         <AreaChart
//           data={data}
//           margin={{
//             top: 10,
//             right: 30,
//             left: 0,
//             bottom: 0,
//           }}
//         >
//           <defs>
//             <linearGradient id='colorGradient' x1='0' y1='0' x2='0' y2='1'>
//               <stop offset='5%' stopColor={color} stopOpacity={0.8} />
//               <stop offset='95%' stopColor={color} stopOpacity={0} />
//             </linearGradient>
//           </defs>
//           <CartesianGrid strokeDasharray='3 3' stroke='#444' />
//           <XAxis dataKey='timestamp' stroke='#ccc' />
//           <YAxis stroke='#ccc' />
//           <Tooltip />
//           <Area
//             type='monotone'
//             dataKey={dataKey}
//             stroke={color}
//             fillOpacity={1}
//             fill='url(#colorGradient)'
//           />
//         </AreaChart>
//       </ResponsiveContainer>
//     </div>
//   )
// }

// export default SensorChart

// SensorChart.propTypes = {
//   data: PropType.array.isRequired,
//   dataKey: PropType.string.isRequired,
//   title: PropType.string.isRequired,
//   color: PropType.string.isRequired,
// }
