import { pubsub } from '../../static/clients.js'

const encodingType = 'JSON';

async function createTopicWithSchema(schemaNameOrId, topicNameOrId) {

    const schema = pubsub.schema(schemaNameOrId, topicNameOrId);
    const fullName = await schema.getName();

    await pubsub.createTopic({
        name: topicNameOrId,
        schemaSettings: {
            schema: fullName,
            encoding: encodingType,
        },
    });
    console.log(`Topic ${topicNameOrId} created with schema ${fullName}.`);
}

export { createTopicWithSchema };