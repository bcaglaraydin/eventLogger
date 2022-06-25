import { bigquery } from '../static/clients.js'

async function createDataset(datasetId) {

    const options = {
        location: 'US',
    };

    const [dataset] = await bigquery.createDataset(datasetId, options);
    console.log(`Dataset ${dataset.id} created.`);
}

export { createDataset };