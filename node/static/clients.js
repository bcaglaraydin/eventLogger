import { Storage } from '@google-cloud/storage';
import { BigQuery } from '@google-cloud/bigquery';
import { PubSub } from '@google-cloud/pubsub';

const storage = new Storage();
const bigquery = new BigQuery();
const pubsub = new PubSub();

export { storage, bigquery, pubsub }