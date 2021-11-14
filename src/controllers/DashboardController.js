const Job = require("../model/Job");
const JobUtils = require('../utils/JobsUtils');
const Profile = require("../model/Profile");

module.exports = {
    index(req, res) {
        const jobs = Job.get();
        const profile = Profile.get();

        let statusCount = {
            progress: 0,
            done: 0,
            total: jobs.length
        }
        //total de horas por job em progresso
        let jobTotalHours = 0;

        //vamos calcular quantos dias falta para o fim do projeto
        const updatedJobs = jobs.map((job) => {
            const remaining = JobUtils.remainingDay(job);
            const status = remaining <= 0 ? "done" : "progress";
            //vamos acessar a propriedade do objeto de acordo com o status
            //pois estara sendo verificado no ciclo do map
            //status = done; statusCount[done] += 1;
            statusCount[status] += 1;
            
            //total de horas por job em progresso
            jobTotalHours = (status === "progress")? jobTotalHours + Number(job["daily-hours"]) : jobTotalHours;
                
    
            return {
                ...job,
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile["value-hour"])
            }
        });
        /**
         * qte de horas que eu quero trabalhar por dia (Profile)
         * Menos
         * qte de horas/dias de cada job em progresso
         */
        const freeHours = profile["hours-per-day"] - jobTotalHours;
        res.render("index", { jobs: updatedJobs, profile, statusCount,  freeHours });
    }
}