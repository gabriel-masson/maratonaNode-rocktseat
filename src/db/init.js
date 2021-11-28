const Database = require("./config");

const initDb = {
    async init() {
        //iniciando o bd 
        /**
         * lembre-se que precisamos esperar o bd abrir para poder 
         * executar outras funções por isso usamos async e await 
         */
        const db = await Database();

        //aqui executaremos o sql
        //precismos esperar as funções terminar para poder executar //a proxima
        await db.exec(`
            CREATE TABLE profile (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            avatar TEXT,
            monthly_budget INT,
            days_per_week INT,
            hours_per_day INT,
            vacation_per_year INT,
            value_hour INT
            )
        `);
        await db.exec(`
                CREATE TABLE jobs(
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT,
                    daily_hours INT,
                    total_hours INT,
                    created_At DATETIME 
                )
        `);

        //inserindo os dados no bd
        await db.run(`
                    INSERT INTO profile (
                        name,
                        avatar,
                        monthly_budget,
                        days_per_week,
                        hours_per_day,
                        vacation_per_year,
                        value_hour
                    ) VALUES (
                        "Gabriel",
                        "https://avatars.githubusercontent.com/u/60262748?s=400&u=713fb5c984f067dfa433fdcf08e7dc2de4b40b35&v=4",
                        3000,
                        5,
                        5,
                        4,
                        70
                    )
        `)

        await db.run(`
            INSERT INTO jobs(
                name ,
                daily_hours,
                total_hours,
                created_At 
            )VALUES(
                "MIRAI",
                2,
                5,
                1617514378018
            )
        `);
        await db.run(`
            INSERT INTO jobs(
                name ,
                daily_hours,
                total_hours,
                created_At 
            )VALUES(
                "Oden nitoriyu",
                2,
                24,
                1617514378018
            )
        `);
        await db.close();
    }
}

initDb.init();