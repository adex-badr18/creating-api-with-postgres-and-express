import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Weapon, MythicalWeaponStore } from './models/mythical_weapon';
import mythical_weapon_routes from './handlers/mythical_weapons';

const app: express.Application = express();
const address: string = "0.0.0.0:3000";

const corsOptions = {
    origin: "http://someotherdomian.com",
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello world');
})

// to use cors as middleware for a specific route
app.get('/cors-middleware', cors(corsOptions), (req: Request, res: Response, next: NextFunction) => {
    res.json({ msg: "This is CORS enabled with middleware" });
})

mythical_weapon_routes(app);

app.listen(3000, () => {
    console.log(`Running app on ${address}`);
})