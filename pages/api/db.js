const getCon = () =>{
    const Pool = require('pg').Pool



   return new Pool({
       connectionString: process.env.DATABASE_URL,
       ssl: {
           rejectUnauthorized: false
       }
    });

}

module.exports = {getCon}