
import { storage } from '../../static/clients.js'

const storageClass = 'STANDARD';
const location = 'US';

async function createBucketWithStorageClassAndLocation(bucketName) {

    const [bucket] = await storage.createBucket(bucketName, {
        location,
        [storageClass]: true,
    });

    console.log(
        `${bucket.name} created with ${storageClass} class in ${location}`
    );
}

export { createBucketWithStorageClassAndLocation };

