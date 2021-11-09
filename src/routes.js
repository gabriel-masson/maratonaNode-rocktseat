const express = require("express");
const routes = express.Router();

const views = __dirname + "/views/";

//array responsavel por pegar as informações do form e guardar para usar em outras rotas

const Job = {
    data: [
        {
            id: 1,
            name: "mirai",
            "daily-hours": 24,
            "total-hours": 1200,
            created_At: Date.now()
        },
        {
            id: 2,
            name: "ODEN NITORIU",
            "daily-hours": 8,
            "total-hours": 24,
            created_At: Date.now()
        }
    ],

    controllers: {
        index(req, res) {
            //vamos calcular quantos dias falta para o fim do projeto
            const updatedJobs = Job.data.map((job) => {
                const remaining = Job.services.remainingDay(job);
                const status = remaining <= 0 ? "done" : "progress";

                return {
                    ...job,
                    remaining,
                    status,
                    budget: Job.services.calculateBudget(job,Profile.data["value-hour"])
                }
            });

            res.render(views + "index", { jobs: updatedJobs });
        },
        save(req,res){
            const lastId = Job.data[Job.data.length - 1]?.id || 0;
            Job.data.push({
                id: lastId + 1,
                name: req.body.name,
                "daily-hours": req.body["daily-hours"],
                "total-hours": req.body["total-hours"],
                created_At: Date.now()
            });
            return res.status(201).redirect('/')
        },
        create(req,res){
            return res.render(views + "job");
        },
        show(req,res){
            const jobId = req.params.id;
            //procurar o item com o id correspondente
            //temos que garantir que ambos sejam number
            const  job = Job.data.find(job => Number(job.id) === Number(jobId));
            if(!job){
                return res.status(404).send("JOB NOT FOUND");
            }
            job.budget = Job.services.calculateBudget(job,Profile.data["value-hour"]);
           
            return res.render(views + "job-edit",{job})
        },
        update(req,res){
            const jobId = req.params.id;
            
            const  job = Job.data.find(job => Number(job.id) === Number(jobId));
            if(!job){
                return res.status(404).send("JOB NOT FOUND");
            }

            const jobUpdate = {
                ...job,
                name: req.body.name,
                "total-hours":req.body["total-hours"],
                "daily-hours":req.body["daily-hours"]
            }

            Job.data = Job.data.map(job =>{
                if(Number(job.id)=== Number(jobId)){
                    job = jobUpdate
                }
                return job
            });
            res.redirect("/job/"+jobId)
        },
        delete(req,res){
            const jobId = req.params.id;
            Job.data = Job.data.filter(job => Number(job.id) !== Number(jobId));
            return res.redirect("/")

        }
    },

    services: {

        remainingDay(job) {
            //calcular o dia restante
            const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed();

            const createdDate = new Date(job.created_At);
            const dueDay = createdDate.getDate() + Number(remainingDays);
            //vamos transformar o dia de vencimento em ms
            const dueDateInMs = createdDate.setDate(dueDay);
            //pegando o dia de vencimento - hj
            const timeDiffInMs = dueDateInMs - Date.now();
            const daysInMs = 1000 * 60 * 60 * 24;
            const dayDiff = Math.floor(timeDiffInMs / daysInMs)//arredonda pra baixo
            //retorna x dias
            return dayDiff;
        },
        calculateBudget(job,valueHour){
            return valueHour * job["total-hours"];
        }
    }
};

const Profile = {
    data: {
        name: "Gabriel",
        avatar: "https://github.com/gabriel-masson.png",
        "monthly-budget": 3000,
        "days-per-week": 5,
        "hours-per-day": 5,
        "vacation-per-year": 4,
        "value-hour": 75
    },

    constrollers:{
        index(req,res){
            return  res.render(views + "profile", { profile:Profile.data });
        },
        update(req,res){
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

            Profile.data = {
                ...Profile.data,
                ...req.body,
                "value-hour":valueHour
            }

            return res.redirect("/profile")
        }
    }
}

routes.get('/',Job.controllers.index);
routes.get('/job', Job.controllers.create);
routes.post('/job',Job.controllers.save);
routes.get('/job/:id', Job.controllers.show);
routes.post('/job/:id', Job.controllers.update);
routes.post('/job/delete/:id', Job.controllers.delete);
routes.get('/profile', Profile.constrollers.index);
routes.post('/profile', Profile.constrollers.update);

module.exports = routes;