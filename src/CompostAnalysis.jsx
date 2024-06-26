import { useState, useEffect } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { MoonLoader } from 'react-spinners'

/**
 * ********************** CompostAnalysis - Component to analyze compost data and provide suggestions **********************
 * @param {Object} latestData - The latest compost sensor data.
 * @returns {JSX.Element} - The CompostAnalysis component.
 */
const CompostAnalysis = ({ latestData }) => {
  const [suggestions, setSuggestions] = useState('')
  const [loading, setLoading] = useState(false)
  const prompt = `Given the latest compost sensor data (isolated compost): ${JSON.stringify(
    latestData
  )}, analyze it considering the typical composting conditions. Provide a summerize and suggestions for improvement in Swedish. Here is the description of the data and the normal ranges for an active compost: 
  - co2: 'Koldioxid' (normal levels in an active compost are between 400 to 600 ppm), 
  - distance: 'Avstånd' (irrelevant for this analysis), 
  - humidity_scd: 'Luftfuktighet', 
  - soil_moisture: 'Jordfuktighet' (ranges from very dry 200 to very wet 2000), 
  - soil_temperature: 'Temperatur i jorden', 
  - temperature_scd: 'Omgivande temperatur'. 
  Note: You don't have to mind the distance data. CO2 levels less than 500 ppm should be considered as low and not high in an active compost environment, 2000 ppm is optimal.`

  useEffect(() => {
    console.log('Suggestions updated:', suggestions)
  }, [suggestions])

  /**
   * Analyze the latest compost data by calling the OpenAI API.
   */
  const analyzeData = async () => {
    setLoading(true)
    const url = 'https://api.openai.com/v1/chat/completions'
    const API = import.meta.env.VITE_CHATGPT_API_KEY
    console.log('analyzeData is being called')
    if (!latestData || Object.keys(latestData).length === 0) {
      console.log('No data to analyze')
      setLoading(false)
      return
    }

    try {
      const response = await axios.post(
        url,
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.7,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${API}`,
          },
        }
      )

      console.log('API Response:', response.data)
      if (response.data.choices && response.data.choices.length > 0) {
        const suggestionText = response.data.choices[0].message.content
        const formattedSuggestion = suggestionText.replace(/\n/g, '<br />')
        setSuggestions(formattedSuggestion)
      } else {
        console.log('No suggestions found')
        setSuggestions('Inga förslag tillgängliga.')
      }
    } catch (error) {
      console.error('Error calling OpenAI API', error)
    }
    setLoading(false)
  }

  console.log('Latest data:', latestData)

  return (
    <div className='p-3 bg-violet rounded-lg shadow-lg'>
      <button
        className='px-4 py-2 mb-2 font-bold text-white bg-blue-600 rounded hover:bg-blue-700 transition duration-300 ease-in-out'
        onClick={analyzeData}
      >
        Analyze Data
      </button>
      {loading ? (
        <div className='flex justify-center items-center'>
          <MoonLoader color='#ffffff' />
        </div>
      ) : (
        <div
          className='text-white'
          dangerouslySetInnerHTML={{ __html: suggestions }}
        />
      )}
    </div>
  )
}

export default CompostAnalysis

CompostAnalysis.propTypes = {
  latestData: PropTypes.object.isRequired,
}
