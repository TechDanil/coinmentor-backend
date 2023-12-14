import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import cors from 'cors';
import authRouter from './routers/authRouter';
import newsRouter from './routers/newsRouter';
import { entities as userEntities } from './shared/schemas/userSchema'; 
import { entities as newsEntities } from './shared/schemas/newsSchema';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const allEntities = [...userEntities, ...newsEntities];

createConnection({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: allEntities,
    synchronize: true,
    logging: true,
}).then(async connection => {
    console.log('Connected to the database');
    app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true,
    }));
    app.use(express.json());
    app.use('/api', authRouter);
    app.use('/api', newsRouter);

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(error => console.log(error));