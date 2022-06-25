import { pubsub } from '../static/clients.js'

async function publishPubSubMessage(userEvent) {
    const buffer = Buffer.from(JSON.stringify(userEvent));
    await pubsub.topic('eventlogTopicBerdan').publish(buffer);
}

export { publishPubSubMessage }