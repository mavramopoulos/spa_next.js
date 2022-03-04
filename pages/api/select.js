import {getCon} from "./db";

const db = getCon();

export default async (req, res) => {
    try {
        const results = await db.any('SELECT * FROM employee ORDER BY last_name ASC')
        for (let i = 0; i < results.length; i++) {
            let month = results[i].date_of_birth.getMonth()
            month += 1
            results[i].date_of_birth = results[i].date_of_birth.getDate() + "/" + month.toString() + "/" + results[i].date_of_birth.getFullYear();
        }
        for (let i = 0; i < results.length; i++) {
            if(results[i].is_active === true){
                results[i].is_active = "Yes"
            }else{
                results[i].is_active = "No"
            }
        }
        res.status(200).json(results)
    } catch (error) {
        res.status(500).send({message: ["Error"], error: error})
    }

}

