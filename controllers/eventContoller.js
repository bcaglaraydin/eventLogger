import { publishPubSubMessage } from '../services/publishMessageService.js'
import { queryFromBigQuery } from '../services/queryAnalyticsService.js'

async function publishEvent(req, res) {
    try {
        const event = req.body;
        console.log(event)
        await publishPubSubMessage(event);
        res.status(204).send();
    } catch (ex) {
        console.log(ex);
        res.status(500).send(ex);
    }
}

async function getAnalytics(req, res) {
    try {
        const rows = await queryFromBigQuery();
        res.status(200).send(rows);
    } catch (ex) {
        console.log(ex);
        res.status(500).send(ex);
    }
}


export { publishEvent, getAnalytics }