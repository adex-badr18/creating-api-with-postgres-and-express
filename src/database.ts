import * as dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config(); //initializes the environment variables. You can't access the env vars unless this line exists in your code.

const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_TEST_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    ENV
} = process.env; // process.env is the content of the .env file

let client: Pool;

if (ENV === 'test') {
    client = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_TEST_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    });
}

if (ENV === 'dev') {
    client = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    });
}

client!.connect((err: Error) => {
    if (err) throw err
    console.log('Connected');
})

export default client!;