import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Weapon, MythicalWeaponStore } from './models/mythical_weapon';

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

// Routes to model examples

app.get('/weapons', (_req: Request, res: Response) => {
    try {
        res.send('this is the INDEX route')
    } catch (err) {
        res.status(400)
        res.json(err)
    }
})

app.get('/weapons/:id', (_req: Request, res: Response) => {
    try {
        res.send('this is the SHOW route')
    } catch (err) {
        res.status(400)
        res.json(err)
    }
})

app.post('/weapons', (req: Request, res: Response) => {
    const weapon: Weapon = {
        id: req.body.id,
        name: req.body.name,
        type: req.body.type,
        weight: req.body.weight
    }
    try {
        res.send('this is the CREATE route')
    } catch (err) {
        res.status(400)
        res.json(err)
    }
})

app.put('/weapons/:id', (req: Request, res: Response) => {
    const weapon: Weapon = {
        id: req.body.id,
        name: req.body.name,
        type: req.body.type,
        weight: req.body.weight
    }
    try {
        res.send('this is the EDIT route')
    } catch (err) {
        res.status(400)
        res.json(err)
    }
})

app.delete('/weapons/:id', (_req: Request, res: Response) => {
    try {
        res.send('this is the DELETE route')
    } catch (err) {
        res.status(400)
        res.json(err)
    }
})

// End of model routes

app.listen(3000, () => {
    console.log(`Running app on ${address}`);
})