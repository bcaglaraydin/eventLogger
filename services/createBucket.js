
const storageClass = 'STANDARD';
const location = 'US';
import { storage } from '../static/clients.js'

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

