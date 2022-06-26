import { bigquery } from '../static/clients.js'

async function queryFromBigQuery(query) {

    const options = {
        query: query,
        location: 'US'
    };

    const [job] = await bigquery.createQueryJob(options);
    const [rows] = await job.getQueryResults();
    return rows;

}

export { queryFromBigQuery }