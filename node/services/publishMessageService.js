import { pubsub } from '../static/clients.js'
import { topicNameOrId } from '../static/config.js'

async function publishPubSubMessage(Event) {
    const buffer = Buffer.from(JSON.stringify(Event));
    await pubsub.topic(topicNameOrId).publish(buffer);
}

export { publishPubSubMessage }