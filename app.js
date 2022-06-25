
import express from 'express';
import eventRouter from './routes/eventRoute.js';
import { createDataflow } from './services/createDataflowService.js'
import 'dotenv/config'

process.env.GOOGLE_APPLICATION_CREDENTIALS = "key.json";

await createDataflow(); // creates the dataflow if it doesn't exist.

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/event', eventRouter);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log("Listening on port", port);
});


