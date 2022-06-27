
import express from 'express';
import eventRouter from './routes/eventRoute.js';
import { createDataflow } from './services/createDataflowService.js'
import 'dotenv/config'
import os from 'os'

process.env.GOOGLE_APPLICATION_CREDENTIALS = "key.json";

await createDataflow(); // creates the dataflow if it doesn't exist.

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/event', eventRouter);

// app.use('/', async (req, res) => {
//     console.log(os.hostname())
//     res.status(200).send();
// })

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Listening on port", port);
});


