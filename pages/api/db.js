const getCon = () =>{
    const Pool = require('pg').Pool

    let ssl

    if (process.env.NODE_ENV === 'development') {
        ssl = {rejectUnauthorized: false};
    }

   return new Pool({
        user: "pzuwiduivwdphz",
        password: "c562093a8162eedd52d48faac68a3b3c0f2702c1948d1be014cebc35bf9a1ed8",
        database: "d94hk32rtn7g2p",
        port: 5432,
        host: "ec2-52-31-217-108.eu-west-1.compute.amazonaws.com",
        ssl: ssl
    });

}

module.exports = {getCon}