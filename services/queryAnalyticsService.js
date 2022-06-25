import { bigquery } from '../static/clients.js'
import { projectId, datasetId, tableId } from '../static/config.js'

async function queryFromBigQuery() {

    const query = `SELECT * FROM ${projectId}.${datasetId}.${tableId} LIMIT 100`;

    const options = {
        query: query,
        location: 'US',
    };

    const [job] = await bigquery.createQueryJob(options);

    const [rows] = await job.getQueryResults();
    return rows;
    // console.log('Rows:');
    // rows.forEach(row => console.log(row));
}

export { queryFromBigQuery }