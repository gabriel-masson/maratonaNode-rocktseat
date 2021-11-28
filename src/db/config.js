const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

//abrir a conexão com o BD e o open precisar estar dentro do escopo de uma função
module.exports = () =>  open({
        //aonde vou guardar os dados? Em
        filename: './database.sqlite',
        //quemvai fazer o trablaho de guardar vai ser o drive
        driver: sqlite3.Database
    })
