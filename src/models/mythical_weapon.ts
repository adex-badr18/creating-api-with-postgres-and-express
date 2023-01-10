import client from "../database";

export type Weapon = {
    id: number;
    name: string;
    type: string;
    weight: number;
};

export class MythicalWeaponStore {
    async index(): Promise<Weapon[]> { // a method that returns a list of all items in the database.
        try {
            const conn = await client.connect(); // connect to the database
            const sql = 'SELECT * FROM mythical_weapons'; // write the sql query
            const result = await conn.query(sql); // run the sql query on the database
            conn.release(); // close database connection
            return result.rows; // return the rows contained in the database query result   
        } catch (error) {
            throw new Error(`Error fetching data: ${error}`);
        }

    }

    async show(id: string): Promise<Weapon> {
        try {
            const sql = 'SELECT * FROM mythical_weapons WHERE id=($1)'
            // @ts-ignore
            const conn = await Client.connect()

            const result = await conn.query(sql, [id])

            conn.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find book ${id}. Error: ${err}`)
        }
    }

    async create(w: Weapon): Promise<Weapon> {
        try {
            const sql = 'INSERT INTO mythical_weapons (name, type, weight) VALUES($1, $2, $3) RETURNING *'
            // @ts-ignore
            const conn = await Client.connect()

            const result = await conn
                .query(sql, [w.name, w.type, w.weight])

            const weapon = result.rows[0]

            conn.release()

            return weapon
        } catch (err) {
            throw new Error(`Could not add new book ${w.name}. Error: ${err}`)
        }
    }

    async delete(id: string): Promise<Weapon> {
        try {
            const sql = 'DELETE FROM mythical_weapons WHERE id=($1)'
            // @ts-ignore
            const conn = await Client.connect()

            const result = await conn.query(sql, [id])

            const weapon = result.rows[0]

            conn.release()

            return weapon
        } catch (err) {
            throw new Error(`Could not delete book ${id}. Error: ${err}`)
        }
    }
}