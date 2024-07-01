const { response } = require("express");
const {Pool} = require("pg");

const pool = new Pool ({
    user:"postgres",
    password:"klausasd123",
    host:"localhost",
    port:3001,
    database: "accuratio"
})



module.exports= pool;