import { publishPubSubMessage } from '../services/publishMessageService.js'

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

export { publishEvent }