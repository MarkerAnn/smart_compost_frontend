// import { ScanCommand } from '@aws-sdk/lib-dynamodb'
// import { ddbDocClient } from './aws-config'
// import moment from 'moment'

// const fetchData = async () => {
//   const now = moment.utc()
//   const sevenDaysAgo = now.clone().subtract(7, 'days').valueOf()

//   console.log('Current time:', now.toISOString())
//   console.log('Seven days ago (UTC):', new Date(sevenDaysAgo).toISOString())

//   const params = {
//     TableName: 'PicoW_smart_compost',
//     FilterExpression: '#ts >= :sevenDaysAgo',
//     ExpressionAttributeNames: {
//       '#ts': 'timeStamp',
//     },
//     ExpressionAttributeValues: {
//       ':sevenDaysAgo': sevenDaysAgo,
//     },
//   }

//   console.log('Scan params:', params)

//   try {
//     const data = await ddbDocClient.send(new ScanCommand(params))
//     console.log('Scan result:', data)
//     if (data.Items.length > 0) {
//       const filteredItems = processData(data.Items)
//       console.log('Filtered items:', filteredItems)
//       const latestItem = filteredItems[0] || null // Få den första posten som det senaste objektet
//       return {
//         allItems: filteredItems, // Hela listan
//         latestItem: latestItem, // Det senaste objektet
//       }
//     } else {
//       throw new Error('No data found')
//     }
//   } catch (error) {
//     console.error('Error fetching data:', error)
//     throw error
//   }
// }

// function processData(items) {
//   const results = {}

//   items.forEach((item) => {
//     const timestamp = item.timeStamp
//     const date = new Date(timestamp)
//     const day = date.toISOString().split('T')[0]
//     const hours = date.getUTCHours()

//     if (hours >= 12 && !(day in results)) {
//       results[day] = item
//     }
//   })

//   const filteredItems = Object.values(results)
//   return filteredItems
// }

// export default fetchData

import { ScanCommand } from '@aws-sdk/lib-dynamodb'
import { ddbDocClient } from './aws-config'
import moment from 'moment'

function processData(items) {
  // Sortera items baserat på timestamp
  return items.sort((a, b) => b.timeStamp - a.timeStamp)
}

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
