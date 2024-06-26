import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'

const REGION = import.meta.env.VITE_AWS_REGION // Get region from .env

// ********************** ddbClient - Create a new instance of the DynamoDB client ********************** //

/**
 * Create a new instance of the DynamoDB client.
 * The client is configured with the AWS region and credentials.
 */
const ddbClient = new DynamoDBClient({
  region: REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID, // Get access key id from .env
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY, // Get secret access key from .env
  },
})

// ********************** ddbDocClient - Create a new instance of the DynamoDB Document client ********************** //

/**
 * Create a new instance of the DynamoDB Document client from the DynamoDB client.
 * The Document client provides a higher level abstraction for DynamoDB operations.
 */
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient)

export { ddbDocClient }
