import { createBucketWithStorageClassAndLocation } from './createBucket.js'
import { createTopicWithSchema } from './createPubSubTopic.js'
import { createAvroSchema } from './createSchema.js'
import { createDataset } from './createDataset.js'
import { createTable } from './createDatasetTable.js'
import { GoogleAuth } from 'google-auth-library';
import 'dotenv/config'
import { projectId, bucketName, schemaNameOrId, topicNameOrId, datasetId, tableId } from '../static/config.js'
// process.env.GOOGLE_APPLICATION_CREDENTIALS = "key.json";

async function createDataflow() {

    await createBucketWithStorageClassAndLocation(bucketName);
    await createAvroSchema(schemaNameOrId);
    await createTopicWithSchema(schemaNameOrId, topicNameOrId);
    await createDataset(datasetId);
    await createTable(datasetId, tableId);

    const POST_URL = "https://dataflow.googleapis.com/v1b3/projects/" + projectId + "/locations/" + "us-central1" + "/templates:launch?gcsPath=gs://dataflow-templates/latest/PubSub_to_BigQuery";
    const TEMP_LOCATION = "gs://" + bucketName + "/temp";
    const INPUT_TOPIC = "projects/" + projectId + "/topics/" + topicNameOrId;
    const OUTPUT_TABLE = projectId + ":" + datasetId + "." + tableId;

    try {
        const auth = new GoogleAuth({
            scopes: 'https://www.googleapis.com/auth/cloud-platform'
        });
        const client = await auth.getClient();
        const { status, data } = await client.request({
            url: POST_URL,
            method: 'POST',
            data: {
                jobName: "eventlogJob",
                environment: {
                    bypassTempDirValidation: false,
                    tempLocation: TEMP_LOCATION,
                    ipConfiguration: "WORKER_IP_UNSPECIFIED",
                    additionalExperiments: []
                },
                parameters: {
                    inputTopic: INPUT_TOPIC,
                    outputTableSpec: OUTPUT_TABLE
                }
            }
        })
        console.log(status, data);

    } catch (error) {
        console.log(error);
    }
}

export { createDataflow }
