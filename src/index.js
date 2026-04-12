import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import weatherRoutes from './routes/weather.routes.js';
import errorHandler from './middlewares/errorHandler.middleware.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/', weatherRoutes);

app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
}); 

app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})