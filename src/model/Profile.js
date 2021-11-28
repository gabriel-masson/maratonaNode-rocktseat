const database = require("../db/config");



module.exports = {
    async get(){
        const db = await database();
        await db.open();

        //para trazer os dados certo usamos o get(obs ele só traz um)
        const data = await db.get("SELECT * FROM profile");
        
        /**
         * o DB não aceita "-" então temos que substituir isso
         * mas o cogigo todo usa o "-"
         * então vamos normalizar
         */
        
        await db.close();
        return {
            name: data.name,
            avatar: data.avatar,
            "monthly-budget": data.monthly_budget,
            "days-per-week": data.days_per_week,
            "hours-per-day": data.hours_per_day,
            "vacation-per-year": data.vacation_per_year,
            "value-hour": data.value_hour
        };
    },
    async update(newData){
        const db = await database();
        await db.open();

        //Alterando os dados
        //obs: name e avatar são TEXT então precisa estar com "", template string só traz o valor
        db.get(`UPDATE profile SET
        name = "${newData.name}",
        avatar= "${newData.avatar}",
        monthly_budget =  ${newData["monthly-budget"]},
        days_per_week =  ${newData["days-per-week"]},
        hours_per_day =  ${newData["hours-per-day"]},
        vacation_per_year =  ${newData["vacation-per-year"]},
        value_hour =  ${newData["value-hour"]}
        `);
        
        await db.close();
       
        
    }
}