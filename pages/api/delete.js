import {getCon} from "./db";

const db = getCon();

export default async (req, res) => {
    try {
        const id = parseInt(req.body.id)
        const results = await db.one('DELETE FROM employee WHERE id = $1', [id])
        res.status(200).json(results)
    } catch (error) {
        res.status(500).send({message: ["Error"], error: error})
    }

}