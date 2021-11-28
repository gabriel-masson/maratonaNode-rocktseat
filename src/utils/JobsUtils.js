module.exports = {

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
    calculateBudget(job, valueHour) {
        return valueHour * job["total-hours"];
    }
}