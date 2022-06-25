import express from 'express';
import { publishEvent } from '../controllers/eventContoller.js';

const eventRouter = express.Router();

eventRouter.post('/', publishEvent);

export default eventRouter;