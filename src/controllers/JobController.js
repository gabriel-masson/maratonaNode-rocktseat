const Job = require("../model/Job");
const JobUtils = require('../utils/JobsUtils');
const Profile = require("../model/Profile");

module.exports = {

    async save(req, res) {
        //o bd ja faz isso com o autoincrement
        // const jobs = await Job.get();
        // const lastId = jobs[jobs.length - 1]?.id || 0;

        await Job.create({
            
            name: req.body.name,
            "daily-hours": req.body["daily-hours"],
            "total-hours": req.body["total-hours"],
            created_At: Date.now()
        });
        return res.status(201).redirect('/')
    },
    create(req, res) {
        return res.render("job");
    },
    async show(req, res) {
        const jobId = req.params.id;
        const jobs = await Job.get()
        //procurar o item com o id correspondente
        //temos que garantir que ambos sejam number
        const job = jobs.find(job => Number(job.id) === Number(jobId));
        if (!job) {
            return res.status(404).send("JOB NOT FOUND");
        }
        const profile = await Profile.get();
        job.budget = JobUtils.calculateBudget(job, profile["value-hour"]);

        return res.render("job-edit", { job })
    },
    async update(req, res) {
        const jobId = req.params.id;
        const jobUpdate = {
            
            name: req.body.name,
            "total-hours": req.body["total-hours"],
            "daily-hours": req.body["daily-hours"]
        }

        

        await Job.update(jobUpdate,jobId);
        res.redirect("/job/" + jobId)
    },
    async delete(req, res) {
        const jobId = req.params.id;
        await Job.delete(jobId);
        return res.redirect("/")

    }
}