import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import rateLimit from 'express-rate-limit';
import mongoSanitizer from 'express-mongo-sanitize';
import helmet from 'helmet';
import hpp from 'hpp';


dotenv.config({ path: './config/config.env' });

const limiter = rateLimit({

    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Nice try and move on...'

})

const app = express ();

app.use(cors({

    origin: ['http://localhost:5500','http://localhost:3000','http://localhost:5173'],
    methods: 'GET,POST,DELETE'

}));

app.use('/api/', limiter);

app.use(express.json({limit: '100kb'}));

app.use(mongoSanitizer());

app.use(helmet());

app.use(hpp({

whitelist: ['sort']

}));

export { app };