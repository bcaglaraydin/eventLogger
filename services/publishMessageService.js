import { pubsub } from '../static/clients.js'
import { topicNameOrId } from '../static/config.js'

async function publishPubSubMessage(userEvent) {
    const buffer = Buffer.from(JSON.stringify(userEvent));
    await pubsub.topic(topicNameOrId).publish(buffer);
}

export { publishPubSubMessage }