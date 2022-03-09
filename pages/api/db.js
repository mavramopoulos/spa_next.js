const getCon = () =>{
    const Pool = require('pg').Pool

    let ssl

    if (process.env.NODE_ENV === 'development') {
        ssl = {rejectUnauthorized: false};
    }

   return new Pool({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT,
        host: process.env.DB_HOST,
        ssl: ssl
    });

}

module.exports = {getCon}