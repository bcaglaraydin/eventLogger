import { publishPubSubMessage } from '../services/publishMessageService.js'
import { queryFromBigQuery } from '../services/queryService.js'
import { dailyStatsQuery, totalUsersQuery } from '../static/queries.js'

async function publishEvent(req, res) {
    try {
        const event = req.body;
        await publishPubSubMessage(event);
        res.status(204).send();
    } catch (ex) {
        console.log(ex);
        res.status(500).send(ex);
    }
}

async function getAnalytics(req, res) {
    try {
        const total_users = await queryFromBigQuery(totalUsersQuery);
        const daily_stats = await queryFromBigQuery(dailyStatsQuery);
        res.status(200).send({ "total_users": total_users[0].total_users, "daily_stats": daily_stats });
    } catch (ex) {
        console.log(ex);
        res.status(500).send(ex);
    }
}


export { publishEvent, getAnalytics }