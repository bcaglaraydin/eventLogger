import 'dotenv/config'

const projectId = process.env.PROJECT_ID;
const bucketName = process.env.BUCKET_NAME;
const schemaNameOrId = process.env.SCHEMA_NAME;
const topicNameOrId = process.env.TOPIC_NAME;
const datasetId = process.env.DATASET_NAME;
const tableId = process.env.TABLE_NAME;

export { projectId, bucketName, schemaNameOrId, topicNameOrId, datasetId, tableId }

