import { ScanCommand } from '@aws-sdk/lib-dynamodb'
import { ddbDocClient } from './aws-config'
import moment from 'moment'

/**
 * ********************** processData - Sort items by timestamp in descending order **********************
 * @param {Array} items - The array of items to be sorted.
 * @returns {Array} - The sorted array of items.
 */
function processData(items) {
  // Sort items by timestamp in descending order
  return items.sort((a, b) => b.timeStamp - a.timeStamp)
}

/**
 * ********************** fetchData - Fetch data from DynamoDB table and process it **********************
 * @returns {Promise<Object>} - The processed data, including all items and the latest item.
 * @throws Will throw an error if no data is found or if there is an issue with fetching data.
 */
const fetchData = async () => {
  const now = moment.utc()
  const sevenDaysAgo = now.clone().subtract(7, 'days').valueOf()

  console.log('Current time:', now.toISOString())
  console.log('Seven days ago (UTC):', new Date(sevenDaysAgo).toISOString())

  const params = {
    TableName: 'PicoW_smart_compost',
    FilterExpression: '#ts >= :sevenDaysAgo',
    ExpressionAttributeNames: {
      '#ts': 'timeStamp',
    },
    ExpressionAttributeValues: {
      ':sevenDaysAgo': sevenDaysAgo,
    },
  }

  console.log('Scan params:', params)

  try {
    const data = await ddbDocClient.send(new ScanCommand(params))
    if (data.Items.length > 0) {
      const processedItems = processData(data.Items)
      console.log('Processed items:', processedItems)
      const latestItem = processedItems[0] || null
      return {
        allItems: processedItems,
        latestItem: latestItem,
      }
    } else {
      throw new Error('No data found')
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

export default fetchData
// TODO: om flera värden tas per dag, så kanske man kan göra en beräkning som tar medelvärdet av alla värden per dag. Detta skulle ge en bättre representation av data.
