// src/aws-config.js
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'

const REGION = import.meta.env.VITE_AWS_REGION // Hämta region från .env

// Skapa en Amazon DynamoDB service klient objekt.
const ddbClient = new DynamoDBClient({
  region: REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID, // Hämta Access Key ID från .env
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY, // Hämta Secret Access Key från .env
  },
})

const ddbDocClient = DynamoDBDocumentClient.from(ddbClient)

export { ddbDocClient }
