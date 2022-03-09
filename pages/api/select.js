import {getCon} from "./db";

const db = getCon();
export default async function Select(req, res) {
    if (req.method === 'GET') {
        try {
            const results = await db.query('SELECT * FROM employee ORDER BY last_name ASC')
            results.rows.map((r) => {
                let month = r.date_of_birth.getMonth() + 1
                r.date_of_birth = r.date_of_birth.getDate() + "/" + month.toString() + "/" + r.date_of_birth.getFullYear()
                if (r.is_active === true) {
                    r.is_active = "Yes"
                } else {
                    r.is_active = "No"
                }
            })

            res.status(200).json(results.rows)
        } catch (error) {
            res.status(500).send({message: ["Error"], error: error})
        }
    }
}

