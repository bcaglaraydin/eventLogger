import { bigquery } from '../static/clients.js'

async function createTable(datasetID, tableId) {

    const datasetId = datasetID;

    const schema = 'type:string, session_id:string, event_name:string, event_time:integer, page:string, country:string, region:string,city:string,user_id:string'

    const options = {
        schema: schema,
        location: 'US',
    };

    // Create a new table in the dataset
    const [table] = await bigquery
        .dataset(datasetId)
        .createTable(tableId, options);

    console.log(`Table ${table.id} created.`);
}

export { createTable };