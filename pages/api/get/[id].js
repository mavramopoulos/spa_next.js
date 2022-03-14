import {getCon} from "../db";

const db = getCon();
export default async function Get(req, res) {
    if (req.method === 'GET') {
        try {
            const {id} = req.query
            const results = await db.query('SELECT last_name, first_name, is_active, date_of_birth FROM employee WHERE id = $1'
                , [id])
            results.rows.map((r) => {
                let month = r.date_of_birth.getMonth() + 1
                r.date_of_birth = r.date_of_birth.getDate() + "/" + month.toString() + "/" + r.date_of_birth.getFullYear()
                if (r.is_active === true) {
                    r.is_active = "True"
                } else {
                    r.is_active = "False"
                }
            })

            res.status(200).json(results.rows)
        } catch (error) {
            res.status(500).send({message: ["Error"], error: error})
        }
    }
}

