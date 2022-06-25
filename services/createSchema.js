import { SchemaTypes } from '@google-cloud/pubsub';
import { pubsub } from '../static/clients.js'
import fs from 'fs';

const avscFile = './static/eventlog.avsc';


async function createAvroSchema(schemaNameOrId) {
    const definition = fs.readFileSync(avscFile).toString();
    const schema = await pubsub.createSchema(
        schemaNameOrId,
        SchemaTypes.Avro,
        definition
    );

    const name = await schema.getName();
    console.log(`Schema ${name} created.`);
}

export { createAvroSchema };