import PropType from 'prop-types'

const descriptions = {
  co2: 'Koldioxid',
  distance: 'Avstånd',
  humidity_scd: 'Luftfuktighet',
  soil_moisture: 'Jordfuktighet',
  soil_temperature: 'Temperatur i jorden',
  temperature_scd: 'Omgivande temperatur',
}

const units = {
  co2: 'ppm',
  distance: 'cm',
  humidity_scd: '%',
  soil_temperature: '°C',
  temperature_scd: '°C',
}

/**
 * A function to return a threshold message based on the sensor label and value
 * @param {string} label - The label of the sensor data.
 * @param {number} value - The value of the sensor data.
 * @returns {string} - The threshold message based on the label and value.
 */
const getThresholdMessage = (label, value) => {
  switch (label) {
    case 'co2':
      if (value < 500) return 'Extremt låg (otillräcklig mikrobiell aktivitet)'
      if (value < 1000) return 'Låg (kan behöva mer organiskt material)'
      if (value < 2000) return 'Normal (god komposteringsaktivitet)'
      if (value < 5000) return 'Högre än normalt (effektiv nedbrytning)'
      return 'Risknivå (för hög aktivitet eller dålig ventilation)'
    case 'humidity_scd':
      if (value < 40) return 'För torrt (hämmar komposteringsprocessen)'
      if (value < 60) return 'Optimal (stöder mikrobiell nedbrytning)'
      if (value < 70) return 'Acceptabelt (gränsar till för hög fuktighet)'
      return 'För vått (risk för syrebrist och dålig lukt)'
    case 'temperature_scd': // Omgivande temperatur
      if (value < 15) return 'För kall (kompostprocessen hämmas)'
      if (value < 25) return 'Optimal (ger en stabil miljö för mikrober)'
      if (value < 35) return 'Varm (kan börja hämma viss mikrobiell aktivitet)'
      return 'För varmt (risk för skadliga effekter på kompostkvaliteten)'
    case 'soil_temperature': // Jordtemperatur (i mitten av komposthögen)
      if (value < 15)
        return 'Under 15°C: För kall (något aktivitet men långsam)'
      if (value < 45)
        return 'Idealisk (termofilisk fas, maximal mikrobiell aktivitet)'
      if (value < 60)
        return 'Högt (optimal för nedbrytning men övervakning behövs)'
      return 'Risk för överhettning (kan skada mikroorganismer)'
    case 'soil_moisture': // Jordfuktighet (i mitten av komposthögen)
      if (value < 500) return 'För torr (behöver vattentillsättning)'
      if (value < 800) return 'Något torr (optimal för start av kompostering)'
      if (value < 1200)
        return 'Perfekt fuktbalans (optimal för mikrobiell aktivitet)'
      if (value < 1600) return 'Fuktig (bra för snabb nedbrytning)'
      return 'Mycket fuktig (risk för anaerobiska förhållanden och syrebrist)'
    default:
      return '' // Default return om label inte matchar någon känd kategori
  }
}

/**
 * ********************** LatestReading - Component to display the latest compost sensor reading **********************
 * @param {Object} props - The properties for the LatestReading component.
 * @param {string} props.label - The label for the data point.
 * @param {string|number} props.value - The value for the data point.
 * @param {string|number} props.timestamp - The timestamp for the data point.
 * @returns {JSX.Element} - The LatestReading component.
 */
const LatestReading = ({ label, value, timestamp }) => {
  const displayLabel = descriptions[label] || label
  const displayUnit = units[label] ? ` ${units[label]}` : ''
  const displayValue = typeof value === 'number' ? value.toFixed(2) : value
  const thresholdMessage = getThresholdMessage(label, value)

  return (
    <div className='flex flex-col items-center justify-between p-4 bg-violet rounded-lg shadow-lg w-48 h-48'>
      <h3 className='text-sm text-soft-purple mb-1'>{displayLabel}</h3>
      <p className='text-2xl font-bold text-white mb-1'>{`${displayValue}${displayUnit}`}</p>
      <p className='text-xs text-white mb-1'>{thresholdMessage}</p>
      <p className='text-xs text-soft-purple'>{timestamp}</p>
    </div>
  )
}

export default LatestReading

LatestReading.propTypes = {
  label: PropType.string.isRequired,
  value: PropType.oneOfType([PropType.string, PropType.number]).isRequired,
  timestamp: PropType.oneOfType([PropType.string, PropType.number]).isRequired,
}
