import express, { NextFunction, Request, Response } from 'express';
import { Weapon, MythicalWeaponStore } from '../models/mythical_weapon';

const store = new MythicalWeaponStore();

// -------Beginning of handler functions
const index = async (_req: Request, res: Response) => {
    try {
        const weapons = await store.index();
        res.json(weapons);
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const show = async (req: Request, res: Response) => {
    const weapon = await store.show(req.params.id);
    try {
        res.json(weapon)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const create = async (req: Request, res: Response) => {
    try {
        const weapon: Weapon = {
            id: req.body.id,
            name: req.body.name,
            type: req.body.type,
            weight: req.body.weight
        }

        const newWeapon = store.create(weapon);
        res.json(newWeapon);
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const delete_weapon = async (req: Request, res: Response) => {
    try {
        const deleted = await store.delete(req.params.id);
        res.json(deleted);
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

// UPDATE ROUTE
// const update = async (req: Request, res: Response) => {
//     const weapon: Weapon = {
//         id: req.body.id,
//         name: req.body.name,
//         type: req.body.type,
//         weight: req.body.weight
//     }
//     try {
//         res.send('this is the EDIT route')
//     } catch (err) {
//         res.status(400)
//         res.json(err)
//     }
// }

// ------End of handler functions

// ------Express routes start
const mythical_weapon_routes = (app: express.Application) => {
    app.get('/weapons', index);
    app.get('/weapons/:id', show);
    app.post('/weapons', create);
    app.delete('/weapons/:id', delete_weapon);
    // app.put('/weapons/:id', update);
}
// ------Express routes end

export default mythical_weapon_routes;