const Profile = require("../model/Profile")

module.exports = {
    
        async index(req,res){
            return  res.render("profile", { profile: await Profile.get() });
        },
        async update(req,res){
            const data = req.body;
            const weekPerYear = 52;
            //remover as semanas de ferias do ano, para pegar quantas semanas tem 1 mes
            const weekPerMonth = (weekPerYear - data["vacation-per-year"])/12;

            //total de horas trabalaha na semana
            const weekTotalHours = data["hours-per-day"] * data["days-per-week"];
            //tot de horas trabalhada no mês
            const monthlyTotalHour = weekTotalHours * weekPerMonth;
            // qual será o valor da minha hora?
            const valueHour = data["monthly-budget"]/monthlyTotalHour;

            const profile = await Profile.get();
            await Profile.update({
                ...profile ,
                ...req.body,
                "value-hour":valueHour
            });

            return res.redirect("/profile")
        }
    
}