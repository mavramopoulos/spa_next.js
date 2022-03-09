import {getCon} from "./db";

const db = getCon();

export default async function Insert(req, res) {
    if (req.method === 'POST') {
        try {
            const {last_name, first_name, is_active, date_of_birth} = req.body
            let array = date_of_birth.split("T")
            let date = array[0]
            const results = await db.query('INSERT INTO employee VALUES (DEFAULT, $1, $2, $3, $4)'
                , [last_name, first_name, is_active, date])
            res.status(200).json(results)
        } catch (error) {
            res.status(500).send({message: ["Error"], error: error})
        }
    }
}

