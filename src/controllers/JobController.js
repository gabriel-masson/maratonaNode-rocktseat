const Job = require("../model/Job");
const JobUtils = require('../utils/JobsUtils');
const Profile = require("../model/Profile");

module.exports = {
   
    save(req, res) {
        const jobs = Job.get();
        const lastId = jobs[jobs.length - 1]?.id || 0;
        jobs.push({
            id: lastId + 1,
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
    show(req, res) {
        const jobId = req.params.id;
        const jobs = Job.get()
        //procurar o item com o id correspondente
        //temos que garantir que ambos sejam number
        const job = jobs.find(job => Number(job.id) === Number(jobId));
        if (!job) {
            return res.status(404).send("JOB NOT FOUND");
        }
        const profile = Profile.get();
        job.budget = JobUtils.calculateBudget(job, profile["value-hour"]);

        return res.render("job-edit", { job })
    },
    update(req, res) {
        const jobId = req.params.id;
        const jobs = Job.get();

        const job = jobs.find(job => Number(job.id) === Number(jobId));
        if (!job) {
            return res.status(404).send("JOB NOT FOUND");
        }

        const jobUpdate = {
            ...job,
            name: req.body.name,
            "total-hours": req.body["total-hours"],
            "daily-hours": req.body["daily-hours"]
        }

        const newJob = jobs.map(job => {
            if (Number(job.id) === Number(jobId)) {
                job = jobUpdate
            }
            return job
        });

        Job.update(newJob);
        res.redirect("/job/" + jobId)
    },
    delete(req, res) {
        const jobId = req.params.id;
        Job.delete(jobId);
        return res.redirect("/")

    }
}