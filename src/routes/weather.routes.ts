import express from 'express';
import getWeather from '../services/weather.service.js';
import asyncHandler from '../middlewares/asyncHandler.middleware.js';

const router = express.Router();

router.get('/weather/:city', asyncHandler(async (req: express.Request, res: express.Response) => {

    const city = req.params.city as string;

    const data = await getWeather(city);
    res.json(data);    
}))

export default router;