import express from 'express';
import { publishEvent } from '../controllers/eventContoller.js';
import { getAnalytics } from '../controllers/eventContoller.js';

const eventRouter = express.Router();

eventRouter.post('/', publishEvent);
eventRouter.get('/', getAnalytics);

export default eventRouter;