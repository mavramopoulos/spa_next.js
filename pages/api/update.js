import {getCon} from "./db";

const db = getCon();

export default async function (req, res) {
    if (req.method === 'PUT') {
        try {
            const id = parseInt(req.body.id)
            const {last_name, first_name, is_active, date_of_birth} = req.body
            let results
            if (last_name !== "") {
                results = await db.query('UPDATE employee SET last_name = $1 WHERE id = $2',
                    [last_name, id])
            }
            if (first_name !== "") {
                results = await db.query('UPDATE employee SET first_name = $1 WHERE id = $2',
                    [first_name, id])
            }
            if (is_active !== "") {
                results = await db.query('UPDATE employee SET is_active = $1 WHERE id = $2',
                    [is_active, id])
            }
            if (date_of_birth !== "") {
                let array = date_of_birth.split("T")
                let date = array[0]
                results = await db.query('UPDATE employee SET date_of_birth = $1 WHERE id = $2',
                    [date, id])
            }
            res.status(200).json(results)
        } catch (error) {
            res.status(500).send({message: ["Error"], error: error})
        }
    }
}