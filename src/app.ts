import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import authRouter from './routers/authRouter';
import { entities } from './shared/schemas/userSchema';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

createConnection({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities,
    synchronize: true,
    logging: true,
}).then(async connection => {
    console.log('Connected to the database');
    app.use(express.json());
    app.use('/api', authRouter);

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(error => console.log(error));