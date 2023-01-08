import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config(); //initializes the environment variables. You can't access the env vars unless this line exists in your code.

const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD
} = process.env; // process.env is the content of the .env file

const client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD
});

export default client;