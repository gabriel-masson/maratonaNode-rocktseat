const DataBase = require("../db/config");

module.exports = {
    async get() {
        const db = await DataBase();

        // != de .get que só traz um dado o .all traz todos os dados 
        const jobs = await db.all(`SELECT * FROM jobs`)

        await db.close();

        return jobs.map(job => ({
            id: job.id,
            name: job.name,
            "daily-hours": job.daily_hours,
            "total-hours": job.total_hours,
            created_At: job.created_At 
        }));
    },
    async update(jobUpdate, jobId) {
        const db = await DataBase();

         await db.run(`UPDATE jobs SET
            name = "${jobUpdate.name}",
            daily_hours = ${jobUpdate["daily-hours"]},
            total_hours = ${jobUpdate["total-hours"]}
            WHERE id = ${jobId}
        `)

        await db.close();
    },
    async delete(id) {
        const db = await DataBase();

        await db.run(`DELETE FROM jobs WHERE id = ${id}`);

        await db.close();

    },

    async create(newJob) {
        const db = await DataBase();

        // != de .get que só traz um dado o .all traz todos os dados 

        //alterei aqui o created_at
        const jobs = await db.run(`INSERT INTO jobs (
            name,
            daily_hours,
            total_hours,
            created_At 
        ) VALUES(
            "${newJob.name}",
            ${newJob["daily-hours"]},
            ${newJob["total-hours"]},
            ${newJob.created_At}
        )`);

        await db.close();
    }
}